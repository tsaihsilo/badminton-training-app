from django.urls import path
from .views import DrillListView, EnrollmentListCreateView, EnrollmentDetailView, StudentListView

urlpatterns = [
  path('drills/', DrillListView.as_view(), name='drill-list'),
  path('enrollments/', EnrollmentListCreateView.as_view(), name="enrollment-list-create"),
  path('enrollment/<int:pk>/', EnrollmentDetailView.as_view(), name="enrollment-detail"),
  path('students/', StudentListView.as_view(), name="student-list"),
]