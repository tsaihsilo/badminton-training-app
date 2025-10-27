from rest_framework import serializers
from .models import Drill

class DrillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Drill
    fields = ['id', 'title', 'video_url', 'is_active']