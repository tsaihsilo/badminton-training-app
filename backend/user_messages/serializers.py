from rest_framework import serializers
from .models import User_messages

class MessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = User_messages
    fields = '__all__'