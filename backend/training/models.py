from django.db import models

class Drill(models.Model):
  title = models.CharField(max_length=100)
  video_url = models.URLField()
  is_active = models.BooleanField(default=True)

  class Meta:
    ordering = ["title"]

  def __str__(self):
    return self.title