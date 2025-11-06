from django.db import models
from django.conf import settings


class Drill(models.Model):
  title = models.CharField(max_length=100)
  video_url = models.URLField()
  is_active = models.BooleanField(default=True)

  class Meta:
    ordering = ["title"]

  def __str__(self):
    return self.title
  

class Enrollment(models.Model):
  instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments_as_instructor") 
  student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments_as_student")

  class Meta:
    unique_together = (("instructor", "student"),)
    constraints = [
      models.UniqueConstraint(fields=["student"], name="unique_student_enrollment")
    ]

  def __str__(self):
    return f"{self.student} enrolled under {self.instructor}"