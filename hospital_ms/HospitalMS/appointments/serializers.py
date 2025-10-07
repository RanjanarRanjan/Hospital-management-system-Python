# from rest_framework import serializers
# from .models import Appointment

# class AppointmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Appointment
#         fields = "__all__"
#         read_only_fields = ["user"]  # user is always the logged-in user


# from rest_framework import serializers
# from .models import Appointment

# class AppointmentSerializer(serializers.ModelSerializer):
#     doctor_name = serializers.CharField(source='doctor.name', read_only=True)  # Add doctor name

#     class Meta:
#         model = Appointment
#         fields = ["id", "user", "doctor", "doctor_name", "date", "slot", "created_at"]
#         read_only_fields = ["user", "doctor_name"]

from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)  # Doctor name
    user_name = serializers.CharField(source='user.fullname', read_only=True)  # Use fullname from User

    class Meta:
        model = Appointment
        fields = ["id", "user_name", "doctor_name", "date", "slot"]
