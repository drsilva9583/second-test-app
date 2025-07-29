from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    
    def get_queryset(self):
        done = self.request.query_params.get('done', None)
        if done is not None:
            return Event.objects.filter(done=done.lower() == 'true').order_by('due_date')
        return Event.objects.all().order_by('due_date')

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

@api_view(['PATCH'])
def mark_event_done(request, event_id):
    try:
        event = get_object_or_404(Event, id=event_id)
        event.done = True
        event.save()
        serializer = EventSerializer(event)
        return Response(serializer.data)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def mark_event_undone(request, event_id):
    try:
        event = get_object_or_404(Event, id=event_id)
        event.done = False
        event.save()
        serializer = EventSerializer(event)
        return Response(serializer.data)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)