from django.urls import path
from .views import *
from wider import views as wider_views

urlpatterns = [
    path ('', index),
    path('result/', wider_views.result.as_view(), name='resultP'),
    ]