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
  student_username = serializers.CharField(source="enrollment.student.username", read_only=True)
  drill_title = serializers.CharField(source="drill.title", read_only=True)

  class Meta:
    model = Assignment
    fields = ["id", "enrollment", "drill", "is_completed", "student_username", "drill_title"]


class AssignmentCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ["is_completed"]