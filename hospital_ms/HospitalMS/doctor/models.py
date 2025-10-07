from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    available_days = models.CharField(max_length=200)  # e.g. "monday, tuesday"
    available_slots = models.CharField(max_length=200) # e.g. "10am, 11am, 12pm"

    def __str__(self):
        return self.name
