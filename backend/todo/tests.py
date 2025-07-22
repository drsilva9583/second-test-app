import datetime

from django.utils import timezone
from django.test import TestCase

from .models import Event, CompletedEvent

# Create your tests here.
class EventModelTest(TestCase):
    def setUp(self):
        self.event = Event.objects.create(
            title="Test Event",
            description="This is a test event.",
            due_date=timezone.now() + datetime.timedelta(days=1)
        )

    def test_event_creation(self):
        self.assertEqual(self.event.title, "Test Event")
        self.assertEqual(self.event.description, "This is a test event.")
        self.assertFalse(self.event.done)

    def test_event_str(self):
        expected_str = f"{self.event.title} - Due: {self.event.due_date}"
        self.assertEqual(str(self.event), expected_str)
