from allauth.account.adapter import DefaultAccountAdapter
from user_profile.models import UserProfile
import json

class CustomAccountAdapter(DefaultAccountAdapter):
  def save_user(self, request, user, form, commit=True):
    user = super().save_user(request, user, form, commit=False)
    is_instructor = json.loads(request.body).get("is_instructor", False)
    user.save()
    UserProfile.objects.create(user=user, is_instructor=is_instructor)
    return user