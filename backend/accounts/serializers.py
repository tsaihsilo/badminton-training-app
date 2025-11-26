from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfile

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
  is_instructor = serializers.BooleanField(default=False)

  class Meta:
    model = User
    fields = ["username", "password", "is_instructor"]
    extra_kwargs = { "password": {"write_only": True} }
  
  def create(self, validated_data):
    is_instructor = validated_data.pop("is_instructor")
    user = User.objects.create_user(**validated_data)
    UserProfile.objects.create(user=user, is_instructor=is_instructor)
    return user