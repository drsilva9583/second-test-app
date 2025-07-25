from rest_framework import serializers
from .models import Event, CompletedEvent

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'due_date', 'created_at', 'done']
        read_only_fields = ['created_at']
        
    def create(self, validated_data):
        return Event.objects.create(**validated_data)
    
class CompletedEventSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)

    class Meta:
        model = CompletedEvent
        fields = ['id', 'event', 'completed_at']
        read_only_fields = ['completed_at']