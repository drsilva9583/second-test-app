from django.contrib import admin
from .models import Event, CompletedEvent

# Register your models here.
admin.site.register(Event)
admin.site.register(CompletedEvent)
