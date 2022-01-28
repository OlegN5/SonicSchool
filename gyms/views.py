from django.shortcuts import render
from django.http import HttpResponse, request
# Create your views here.


def index(request):
    # print (dir(request))
    return render (request, 'gyms/home.html')


 
  