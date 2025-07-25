from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse, Http404
from django.template import loader
from .models import Event, CompletedEvent


# Create your views here.
def index(request):
    #can filter events based on todays date
    events = Event.objects.filter(done=False).order_by('due_date')
    return render(request, 'todo/index.html', {'events':events})

def detail(request):
    completed_events = Event.objects.filter(done=True)
    return render(request, 'todo/detail.html', {'completed_events': completed_events})

def mark_done(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    event.done = True
    event.save()
    return redirect('todo:index')

def create_event(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description', '')
        due_date = request.POST.get('due_date')
        
        if title and due_date:
            event = Event(title=title, description=description, due_date=due_date)
            event.save()
            return redirect('todo:index')
        else:
            return HttpResponse("Title and Due Date are required.", status=400)
    return redirect('index')