from django.urls import path
from .views import  available_doctors , available_slots , book_appointment ,my_appointments ,all_appointments ,delete_appointment

urlpatterns = [
    path("available/", available_doctors, name="available_doctors"),
    path("slots/", available_slots, name="available_slots"),
    path("book/", book_appointment, name="book_appointment"),
    path("my/", my_appointments, name="my_appointments"),
    path("all/", all_appointments, name="all_appointments"), 
    path("delete/<int:appointment_id>/", delete_appointment, name="delete_appointment"),
]