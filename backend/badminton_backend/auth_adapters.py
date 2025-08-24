from allauth.headless.adapter import DefaultHeadlessAdapter;

class MyHeadlessAdapter(DefaultHeadlessAdapter):
  def serialize_user(self, user):
    from user_profile.models import UserProfile
    profile = UserProfile.objects.filter(user=user).first()
    return {
      "id": user.id,
      "username": user.username,
      "is_instructor": bool(getattr(profile, "is_instructor", False))
    }
































# from allauth.headless.adapter import DefaultHeadlessAdapter

# class MyHeadlessAdapter(DefaultHeadlessAdapter):
#     def serialize_user(self, user):
#         # local import avoids rare app-loading/circular issues
#         from user_profile.models import UserProfile
#         up = UserProfile.objects.filter(user=user).first()
#         return {
#             "id": user.id,
#             "username": user.username,
#             "is_instructor": bool(getattr(up, "is_instructor", False)),
#         }