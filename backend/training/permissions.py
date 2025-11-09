from rest_framework import permissions

class IsInstructor(permissions.BasePermission):
  """Allow access only to instructor users."""
  def has_permission(self, request, view):
    return request.user.userprofile.is_instructor
  
class IsStudent(permissions.BasePermission):
  """Allow access only to student users."""
  def has_permission(self, request, view):
    return not request.user.userprofile.is_instructor