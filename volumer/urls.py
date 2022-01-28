from django.urls import path
from .views import *
from volumer import views as volumer_views

urlpatterns = [
    path ('', index),
    path('result/', volumer_views.result.as_view(), name='result'),
    ]