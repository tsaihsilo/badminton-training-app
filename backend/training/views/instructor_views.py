from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, serializers
from ..permissions import IsInstructor
from ..models import Drill, Enrollment, Assignment
from ..serializers import DrillSerializer, EnrollmentSerializer, AssignmentSerializer, StudentSerializer

User = get_user_model()

class InstructorEnrollmentListCreateView(generics.ListCreateAPIView):
  """
  GET -> list all current students under this instructor
  POST -> enroll a new student under this instructor
  Used in: Instructor 'Manage Students' page.
  """
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
  
  
class InstructorEnrollmentDetailView(generics.DestroyAPIView):
  """
  DELETE -> remove a student under this instructor (by enrollment id)
  Used in: Instructor 'Manage Students' page.
  """
  serializer_class = EnrollmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]
  
  def get_queryset(self):
    return Enrollment.objects.filter(instructor=self.request.user)


class InstructorStudentListView(generics.ListAPIView):
  """
  GET -> list all students (for dropdown when adding/removing)
  Used in: Instructor 'Manage Students' page.
  """
  serializer_class = StudentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]
  queryset = User.objects.filter(userprofile__is_instructor=False)


class InstructorDrillListView(generics.ListAPIView):
  """
  GET -> list all demo drills
  Used in: Instructor 'Demo Videos' page.
  """
  serializer_class = DrillSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]
  queryset = Drill.objects.filter(is_active=True).order_by("title")


class InstructorAssignmentListCreateView(generics.ListCreateAPIView):
  """
  GET -> list all assignments for this instructor's students
  POST -> assign a new drill to a student (via enrollment)
  Used in : Instructor 'Assign Drills' page.
  """
  serializer_class = AssignmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]

  def get_queryset(self):
    return Assignment.objects.filter(enrollment__instructor=self.request.user)
  
  def perform_create(self, serializer):
    enrollment = serializer.validated_data["enrollment"]
    drill = serializer.validated_data["drill"]

    if enrollment.instructor != self.request.user:
      raise serializers.ValidationError("You cannot assign drills to students you do not coach.")
    
    if Assignment.objects.filter(enrollment=enrollment, drill=drill).exists():
      raise serializers.ValidationError({
        "detail": "This drill is already assigned to the selected student."
      })
    
    serializer.save()
  

class InstructorAssignmentDetailView(generics.DestroyAPIView):
  """
  DELETE -> unassign a drill (by assignment id)
  Used in: Instructor 'Assign Drill' page.
  """
  serializer_class = AssignmentSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]

  def get_queryset(self):
    return Assignment.objects.filter(enrollment__instructor=self.request.user)