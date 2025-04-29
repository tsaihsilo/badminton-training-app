from django.contrib import admin
from .models import User_messages

# Register your models here.
class MessagesAdmin(admin.ModelAdmin):
  fieldsets = [
    (None, {'fields': ['sender']}),
    (None, {'fields': ['receiver']}),
    (None, {'fields': ['content']}),
  ]
  list_display = ("sender", "receiver", "content", "timestamp")
  search_fields = ("sender__username", "receiver__username", "content")

admin.site.register(User_messages, MessagesAdmin)