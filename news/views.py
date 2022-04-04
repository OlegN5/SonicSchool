from audioop import reverse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import (
    ListView, 
    DetailView, 
    CreateView,
    UpdateView,
    DeleteView)
from .models import Post
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from django.contrib.auth.decorators import login_required



# Create your views here.

# posts = [{
#     'title': 'Регистрация',
#     'content': 'На сайте появилась регистрация, теперь, чтобы пользоваться тренажерами, необходимо авторизоваться.',
#     'date': '2 Марта, 2022'
# },
# {
#     'title': 'Новый тренажер "СВЕДЕНИЕ"',
#     'content': 'Испытайте свои профессиональные навыки на новом тренажере по сведению.',
#     'date': '1 Марта, 2022'
# }]

def index(request):
    # print (dir(request))
    context = {
        'posts': Post.objects.all()
    }
    return render (request, 'news/home.html', context)
    
class PostListView(ListView):
    model = Post
    template_name = 'news/home.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']


class PostDetailView(DetailView):
    model = Post


# @login_required
class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content']

    def form_valid(self, form): #???
        form.instance.author = self.request.user #???
        return super().form_valid(form)  #???

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content']

    def form_valid(self, form): #???
        form.instance.author = self.request.user #???
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/news'
    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False





def test(request):
    return HttpResponse ('<h1>TEST page</h1>')