from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from user_profile.models import UserProfile
from django.db import transaction

class CustomRegisterSerializer(RegisterSerializer):
    is_instructor = serializers.BooleanField(required=False)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        UserProfile.objects.update_or_create(
            user=user,
            defaults={"is_instructor": self.validated_data["is_instructor"]}
        )
        return user