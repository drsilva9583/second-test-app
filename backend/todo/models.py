from django.db import models

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField("created at", auto_now_add=True)
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return (self.title + " - Due: " + str(self.due_date))
    
    
    