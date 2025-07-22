from django.urls import path
from . import views

app_name = 'todo'
urlpatterns = [
    path("", views.index, name='index'),
    path("completed/", views.detail, name="detail"),    
    path("marked-done/<int:event_id>/", views.mark_done, name="mark_done"),
    path("create-event/", views.create_event, name="create_event"),
]