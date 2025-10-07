from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from doctor.models import Doctor
from .models import Appointment
import datetime
from .serializers import AppointmentSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def available_doctors(request):
    if request.user.user_role != "user":
        return Response({"error": "Only users can access this"}, status=403)

    date_str = request.GET.get("date")  # e.g. "2025-09-16"
    if not date_str:
        return Response({"error": "Provide date"}, status=400)

    try:
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)

    today = datetime.date.today()
    if date_obj < today:
        return Response({"error": "Cannot select past dates"}, status=400)

    day_of_week = date_obj.strftime("%A").lower()
    available = []

    for doc in Doctor.objects.all():
        doctor_days = [d.strip().lower() for d in doc.available_days.split(",")]
        if day_of_week not in doctor_days:
            continue

        booked_slots = Appointment.objects.filter(doctor=doc, date=date_obj).values_list("slot", flat=True)
        all_slots = [s.strip() for s in doc.available_slots.split(",")]
        free_slots = [s for s in all_slots if s not in booked_slots]

        if free_slots:
            available.append(doc.name)

    return Response(available)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def available_slots(request):
    if request.user.user_role != "user":
        return Response({"error": "Only users can access this"}, status=403)

    date_str = request.GET.get("date")
    doctor_name = request.GET.get("doctor")

    if not date_str or not doctor_name:
        return Response({"error": "Provide date and doctor"}, status=400)

    try:
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)

    today = datetime.date.today()
    if date_obj < today:
        return Response({"error": "Cannot select past dates"}, status=400)

    try:
        doctor = Doctor.objects.get(name__iexact=doctor_name)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=404)

    day_of_week = date_obj.strftime("%A").lower()
    doctor_days = [d.strip().lower() for d in doctor.available_days.split(",")]
    if day_of_week not in doctor_days:
        return Response({"error": "No slots available"}, status=400)

    booked_slots = Appointment.objects.filter(doctor=doctor, date=date_obj).values_list("slot", flat=True)
    all_slots = [s.strip() for s in doctor.available_slots.split(",")]
    free_slots = [s for s in all_slots if s not in booked_slots]

    return Response(free_slots)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def book_appointment(request):
    if request.user.user_role != "user":
        return Response({"error": "Only users can access this"}, status=403)

    user = request.user
    date_str = request.data.get("date")
    doctor_name = request.data.get("doctor")
    slot = request.data.get("slot")

    if not date_str or not doctor_name or not slot:
        return Response({"error": "Provide date, doctor, and slot"}, status=400)

    try:
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)

    today = datetime.date.today()
    if date_obj < today:
        return Response({"error": "Cannot book for past dates"}, status=400)

    try:
        doctor = Doctor.objects.get(name__iexact=doctor_name)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=404)

    day_of_week = date_obj.strftime("%A").lower()
    doctor_days = [d.strip().lower() for d in doctor.available_days.split(",")]
    if day_of_week not in doctor_days:
        return Response({"error": f"{doctor_name} is not available on {day_of_week}"}, status=400)

    all_slots = [s.strip() for s in doctor.available_slots.split(",")]
    if slot not in all_slots:
        return Response({"error": f"{slot} is not a valid slot for {doctor_name}"}, status=400)

    if Appointment.objects.filter(doctor=doctor, date=date_obj, slot=slot).exists():
        return Response({"error": "Slot already booked"}, status=400)

    appointment = Appointment.objects.create(
        user=user,
        doctor=doctor,
        date=date_obj,
        slot=slot
    )

    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_appointments(request):
    if request.user.user_role != "user":
        return Response({"error": "Only users can access this"}, status=403)

    user = request.user
    appointments = Appointment.objects.filter(user=user).order_by("-date", "slot")
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_appointments(request):
    user = request.user
    if user.user_role != "admin":
        return Response({"error": "Only admin can view all appointments"}, status=403)

    # Order by date and slot
    appointments = Appointment.objects.all().order_by("date", "slot")
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_appointment(request, appointment_id):
    # Block admins
    if request.user.user_role != "user":
        return Response({"error": "Only users can access this"}, status=403)

    user = request.user
    try:
        appointment = Appointment.objects.get(id=appointment_id, user=user)
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found"}, status=404)

    # Check if the appointment date is at least 1 day in the future
    today = datetime.date.today()
    if appointment.date <= today:
        return Response({"error": "Cannot delete past or same-day appointments"}, status=400)

    appointment.delete()
    return Response({"success": "Appointment deleted successfully"})
