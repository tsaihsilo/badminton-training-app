from django.db import models
from django.conf import settings

class UserProfile(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
  is_instructor = models.BooleanField(default=False)

  def __str__(self):
    role = "Instructor" if self.is_instructor else "Student"
    return f"{self.user.username} ({role})"