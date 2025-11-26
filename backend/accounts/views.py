from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from rest_framework.authtoken.models import Token

class SignupView(APIView):
  permission_classes = []
  authentication_classes = []

  def post(self, request):
    serializer = SignupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)
    return Response(
      {"token": token.key}, 
      status=status.HTTP_201_CREATED,
    )