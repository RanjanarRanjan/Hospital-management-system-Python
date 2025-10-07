from django.urls import path
from .views import add_doctor, update_doctor, delete_doctor, list_doctors

urlpatterns = [
    path("add/", add_doctor, name="add_doctor"),
    path("update/<int:pk>/", update_doctor, name="update_doctor"),
    path("delete/<int:pk>/", delete_doctor, name="delete_doctor"),
    path("list/", list_doctors, name="list_doctors"),
]
