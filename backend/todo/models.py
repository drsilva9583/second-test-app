from django.db import models

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField("created at", auto_now_add=True)
    
    def __str__(self):
        return (self.title + " - " + str(self.due_date)) 
    
class CompletedEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.event.title} - {'Done' if self.done else 'Not Done'}"
    
    
    