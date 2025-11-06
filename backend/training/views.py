from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, serializers, status
from rest_framework.response import Response
from .models import Drill, Enrollment
from .serializers import DrillSerializer, EnrollmentSerializer, StudentSerializer
from .permissions import IsInstructor

User = get_user_model()

class DrillListView(generics.ListAPIView):
  serializer_class = DrillSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]
  queryset = Drill.objects.filter(is_active=True).order_by("title")


class EnrollmentListCreateView(generics.ListCreateAPIView):
  serializer_class = EnrollmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]

  def get_queryset(self):
    return Enrollment.objects.filter(instructor=self.request.user)

  def perform_create(self, serializer):
    student = serializer.validated_data["student"]
    if Enrollment.objects.filter(student=student).exists():
      raise serializers.ValidationError({
        "student": "This student is already enrolled."
      })
    serializer.save(instructor=self.request.user)
  
  
class EnrollmentDetailView(generics.DestroyAPIView):
  serializer_class = EnrollmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]
  
  def get_queryset(self):
    return Enrollment.objects.filter(instructor=self.request.user)


class StudentListView(generics.ListAPIView):
  serializer_class = StudentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]
  queryset = User.objects.filter(userprofile__is_instructor=False)


# class StudentAssignedDrillListView(generics.ListAPIView):
#   serializer_class = AssignmentSerializer
#   permission_classes = [permissions.IsAuthenticated]
#   def get_queryset(self):
#     return Assignment.objects.filter(student=self.request.user)