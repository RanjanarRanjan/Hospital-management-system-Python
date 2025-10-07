from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Doctor
from .serializers import DoctorSerializer
from accounts.authentication import CookieJWTAuthentication

# Add Doctor (Admin only)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_doctor(request):
    if request.user.user_role != "admin":
        return Response({"error": "Only admin can add doctors"}, status=status.HTTP_403_FORBIDDEN)

    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Doctor added successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Update Doctor (Admin only)
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_doctor(request, pk):
    if request.user.user_role != "admin":
        return Response({"error": "Only admin can update doctors"}, status=status.HTTP_403_FORBIDDEN)

    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctor, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Doctor updated successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete Doctor (Admin only)
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_doctor(request, pk):
    if request.user.user_role != "admin":
        return Response({"error": "Only admin can delete doctors"}, status=status.HTTP_403_FORBIDDEN)

    try:
        doctor = Doctor.objects.get(pk=pk)
        doctor.delete()
        return Response({"message": "Doctor deleted successfully"}, status=status.HTTP_200_OK)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)


# List all Doctors (Everyone can view)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_doctors(request):
    if request.user.user_role != "admin":
        return Response({"error": "Only admin can view doctors List"}, status=status.HTTP_403_FORBIDDEN)
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
