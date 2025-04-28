from rest_framework import viewsets
from .models import User_messages
from .serializers import MessageSerializer
from django.contrib.auth.models import User
from django.db.models import Q

class MessageViewSet(viewsets.ModelViewSet):
  queryset = User_messages.objects.all()
  serializer_class = MessageSerializer

  def get_queryset(self):
    user_username = self.request.query_params.get('user')
    
    if user_username:
      try:
        user_username = User.objects.get(username=user_username)
      except User.DoesNotExist:
        return User_messages.objects.none()
      
      return User_messages.objects.filter(
        Q(sender=user_username) | Q(receiver=user_username)
      ).order_by('timestamp')
    
    return User_messages.objects.none()