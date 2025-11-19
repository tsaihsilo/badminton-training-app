from django.db import IntegrityError
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Drill, Enrollment, Assignment

User = get_user_model()

class TrainingModelTests(TestCase):
  def setUp(self):
    self.instructor = User.objects.create_user(username="kevin", password="20021031")
    self.student = User.objects.create_user(username="selena", password="20040303")
    self.drill = Drill.objects.create(title="Footwork", video_url="https://footwork/example")
    self.enrollment = Enrollment.objects.create(instructor=self.instructor, student=self.student)

  def test_enrollment_str(self):
    text = str(self.enrollment)
    self.assertIn("selena", text)
    self.assertIn("kevin", text)

  def test_assignment_unique_constraint(self):
    Assignment.objects.create(enrollment=self.enrollment, drill=self.drill)
    with self.assertRaises(IntegrityError):
      Assignment.objects.create(enrollment=self.enrollment, drill=self.drill)