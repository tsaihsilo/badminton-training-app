from rest_framework import generics, permissions
from .models import Drill
from .serializers import DrillSerializer
from .permissions import IsInstructor

class DrillListView(generics.ListAPIView):
  queryset = Drill.objects.filter(is_active=True).order_by("title")
  serializer_class = DrillSerializer
  permission_classes = [permissions.IsAuthenticated, IsInstructor]

# class StudentAssignedDrillListView(generics.ListAPIView):
#   serializer_class = AssignmentSerializer
#   permission_classes = [permissions.IsAuthenticated]
#   def get_queryset(self):
#     return Assignment.objects.filter(student=self.request.user)