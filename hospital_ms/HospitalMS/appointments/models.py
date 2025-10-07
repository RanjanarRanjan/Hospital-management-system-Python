from django.db import models
from accounts.models import User
from doctor.models import Doctor

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    slot = models.CharField(max_length=50)  # e.g. "10am"

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.fullname} - {self.doctor.name} - {self.date} {self.slot}"
