from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from django.http import Http404
from ..permissions import IsStudent
from ..models import Enrollment, Assignment
from ..serializers import EnrollmentSerializer, AssignmentSerializer, AssignmentCompletionSerializer

User = get_user_model()

class StudentEnrollmentView(generics.RetrieveAPIView):
  """
  GET -> show the instructor this student is enrolled under
  Used in: Student 'Profile' page.
  """
  serializer_class = EnrollmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsStudent]

  def get_object(self):
    enrollment = Enrollment.objects.filter(student=self.request.user).first()
    if not enrollment:
      raise Http404
    return enrollment


class StudentAssignmentListView(generics.ListAPIView):
  """
  GET -> list all drills assigned to this student
  Used in: Student 'Assigned Drills' page.
  """
  serializer_class = AssignmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsStudent]

  def get_queryset(self):
    enrollment = Enrollment.objects.filter(student=self.request.user).first()
    if not enrollment:
      return Assignment.objects.none()
    return Assignment.objects.filter(enrollment=enrollment)
  

class StudentAssignmentUpdateView(generics.UpdateAPIView):
  """
  PATCH -> mark an assigned drill as completed 
  Used in: Student 'Assigned Drills' page.
  """
  serializer_class = AssignmentCompletionSerializer
  permission_classes = [permissions.IsAuthenticated, IsStudent]
  http_method_names = ["patch"]

  def get_queryset(self):
    return Assignment.objects.filter(enrollment__student=self.request.user)