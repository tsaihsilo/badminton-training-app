from django.urls import path
from . import views

urlpatterns = [
  path("testing/", views.add_message)
]