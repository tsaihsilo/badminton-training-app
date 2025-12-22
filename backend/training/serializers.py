from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Drill, Enrollment, Assignment


User = get_user_model()


class DrillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Drill
    fields = ["id", "title", "video_url", "is_active"]


class EnrollmentSerializer(serializers.ModelSerializer):
  instructor_username = serializers.CharField(source="instructor.username", read_only=True)
  student_username = serializers.CharField(source="student.username", read_only=True)

  class Meta:
    model = Enrollment
    fields = ["id", "instructor", "student", "instructor_username", "student_username"]
    extra_kwargs = {
      "instructor": {"read_only": True}
    }


class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username"]


class AssignmentSerializer(serializers.ModelSerializer):
  drill = serializers.PrimaryKeyRelatedField(
    queryset=Drill.objects.all() , write_only=True
  ) 
  drill_detail = DrillSerializer(source="drill", read_only=True)
  
  class Meta:
    model = Assignment
    fields = ["id", "enrollment", "drill", "drill_detail", "is_completed"]


class AssignmentCompletionSerializer(serializers.ModelSerializer):
  class Meta:
      model = Assignment
      fields = ["is_completed"]