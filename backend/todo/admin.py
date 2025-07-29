from django.contrib import admin
from .models import Event

# Register your models here.
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'due_date', 'done', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('done', 'due_date')
    fieldsets = [
        (None, {'fields': ('title', 'description', 'done')}),
        ('Date Information', {'fields': ['due_date']}),
    ]

admin.site.register(Event, EventAdmin)