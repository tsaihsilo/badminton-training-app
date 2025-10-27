from django.urls import path
from .views import DrillListView

urlpatterns = [
  path('drills/', DrillListView.as_view(), name='drill-list'),
]