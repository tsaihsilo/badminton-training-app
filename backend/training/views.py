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
    enrollment = serializer.validated_data['enrollment']
    if enrollment.instructor != self.request.user:
      raise serializers.ValidationError("You cannot assign drills to students you do not coach.")
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



# Student views
class StudentEnrollmentView(views.APIView):
  """
  GET -> show the instructor this student is enrolled under
  Used in: Student 'Profile' page.
  """
  permission_classes = [permissions.IsAuthenticated, IsStudent]

  def get(self, request):
    enrollment = Enrollment.objects.filter(student=self.request.user).first()
    if not enrollment:
      return Response(
        {"message": "You are not enrolled under any instructor."},
        status=status.HTTP_404_NOT_FOUND
      )
    return Response({
      "instructor_username": enrollment.instructor.username
    })


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