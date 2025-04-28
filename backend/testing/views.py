import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from user_messages.models import User_messages
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

# Create your views here.
# def testing(request):
#   data = {'message': 'Hello from backend!'}
#   return JsonResponse(data)

@csrf_exempt
def add_message(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    sender_username = data['sender']
    receiver_username = data['receiver']
    content = data['content']

    try:
      sender_username = User.objects.get(username=sender_username)
      receiver_username = User.objects.get(username=receiver_username)
    except User.DoesNotExist:
      return JsonResponse({'error': 'Sender or receiver does not exist'}, status=400)

    m = User_messages(sender = sender_username, receiver = receiver_username, content = content)
    m.save()

    return JsonResponse({'message': 'Message created successfully!'})
  
  return JsonResponse({'message': 'Not a post method'})