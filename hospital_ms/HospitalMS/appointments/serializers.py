from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)  # Doctor name
    user_name = serializers.CharField(source='user.fullname', read_only=True)  # Use fullname from User

    class Meta:
        model = Appointment
        fields = ["id", "user_name", "doctor_name", "date", "slot"]
        
    def get_user_name(self, obj):
        return obj.user.fullname or obj.user.email
