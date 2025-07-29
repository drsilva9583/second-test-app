from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'due_date', 'created_at', 'done']
        read_only_fields = ['created_at']
        
    def create(self, validated_data):
        return Event.objects.create(**validated_data)
