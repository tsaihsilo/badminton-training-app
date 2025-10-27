from rest_framework import permissions

class IsInstructor(permissions.BasePermission):
  """Allow access only to instructor users."""
  def has_permission(self, request, view):
    return request.user.userprofile.is_instructor