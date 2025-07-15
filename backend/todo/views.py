from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse, Http404
from django.template import loader
from .models import Event, CompletedEvent


# Create your views here.
def index(request):
    #can filter events based on todays date
    events = Event.objects.filter(done=False)
    return render(request, 'todo/index.html', {'events':events})

def detail(request):
    completed_events = Event.objects.filter(done=True)
    return render(request, 'todo/detail.html', {'completed_events': completed_events})

def mark_done(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    event.done = True
    event.save()
    return redirect('index')