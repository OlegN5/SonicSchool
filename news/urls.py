from django.urls import path
from .views import *

urlpatterns = [
    path ('', PostListView.as_view(), name='news'),
    path ('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path ('post/new/', PostCreateView.as_view(), name='post-create'),
    path ('test/', test)
    ] 