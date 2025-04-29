from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User_messages
from .serializers import MessageSerializer
from django.contrib.auth.models import User
from django.db.models import Q

@api_view(['GET'])
def all_conversations(request):
  user_username = request.query_params.get('username')

  if user_username:

    try:
      user = User.objects.get(username=user_username)
    except User.DoesNotExist:
      return Response({'message': 'User does not exist'})
  
    message = User_messages.objects.filter(Q(sender=user) | Q(receiver=user))
    serializer = MessageSerializer(message, many=True)

    return Response(serializer.data)
  
  return Response()