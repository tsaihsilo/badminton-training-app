from allauth.account.adapter import DefaultAccountAdapter
from .models import UserProfile
import json

class CustomAccountAdapter(DefaultAccountAdapter):
  def save_user(self, request, user, form, commit=True):
    user = super().save_user(request, user, form, commit=False)

    try:
      payload = json.loads(request.body or "{}")
      is_instructor = bool(payload.get("is_instructor", False))
    except Exception:
      is_instructor = False

    user.save()
    UserProfile.objects.get_or_create(
      user=user,
      defaults={"is_instructor": is_instructor}
    )

    return user