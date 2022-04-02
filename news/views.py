from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
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
    
def test(request):
    return HttpResponse ('<h1>TEST page</h1>')