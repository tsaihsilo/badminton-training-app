from django.db import models
from django.contrib.auth.models import User

class User_messages(models.Model):
  sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
  receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
  content = models.TextField()
  timestamp = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    local_time  = self.timestamp.astimezone().strftime("%Y-%m-%d %I:%M %p")
    return f"From {self.sender} to {self.receiver} at {local_time}"
