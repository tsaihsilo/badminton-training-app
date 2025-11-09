from django.urls import path
from .views import (
  InstructorDrillListView, 
  InstructorEnrollmentListCreateView, InstructorEnrollmentDetailView, 
  InstructorStudentListView,
  InstructorAssignmentListCreateView, InstructorAssignmentDetailView,
  StudentEnrollmentView,
  StudentAssignmentListView, StudentAssignmentUpdateView
)

urlpatterns = [
  # Instructor endpoints
  path("instructor/drills/", InstructorDrillListView.as_view(), name="instructor-drill-list"),
  path("instructor/enrollments/", InstructorEnrollmentListCreateView.as_view(), name="instructor-enrollment-list-create"),
  path("instructor/enrollments/<int:pk>/", InstructorEnrollmentDetailView.as_view(), name="instructor-enrollment-detail"),
  path("instructor/students/", InstructorStudentListView.as_view(), name="instructor-student-list"),
  path("instructor/assignments/", InstructorAssignmentListCreateView.as_view(), name="instructor-assignment-list-create"),
  path("instructor/assignments/<int:pk>/", InstructorAssignmentDetailView.as_view(), name="instructor-assignment-detail"),
  
  # Student endpoints
  path("student/enrollments/", StudentEnrollmentView.as_view(), name="student-enrollment"),
  path("student/assignments/", StudentAssignmentListView.as_view(), name="student-assignments"),
  path("student/assignments/<int:pk>/", StudentAssignmentUpdateView.as_view(), name="student-assignment-update"),
]