from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    ## ex: /todo/5/
    path("<int:event_id>/", views.detail, name="detail")
]