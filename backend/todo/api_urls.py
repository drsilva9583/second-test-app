from django.urls import path
from . import api_views

app_name = 'todo_api'

urlpatterns = [
    # List all events or create new event
    # GET /api/events/ - List all events
    # GET /api/events/?done=true - List completed events  
    # GET /api/events/?done=false - List upcoming events
    # POST /api/events/ - Create new event
    path('events/', api_views.EventListCreateView.as_view(), name='event-list-create'),
    
    # Individual event operations
    # GET /api/events/<id>/ - Get specific event
    # PUT/PATCH /api/events/<id>/ - Update event
    # DELETE /api/events/<id>/ - Delete event
    path('events/<int:pk>/', api_views.EventDetailView.as_view(), name='event-detail'),
    
    # Mark events as done/undone
    # PATCH /api/events/<id>/mark-done/ - Mark as completed
    # PATCH /api/events/<id>/mark-undone/ - Mark as incomplete
    path('events/<int:event_id>/mark-done/', api_views.mark_event_done, name='mark-event-done'),
    path('events/<int:event_id>/mark-undone/', api_views.mark_event_undone, name='mark-event-undone'),
]