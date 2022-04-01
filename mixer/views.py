from django.shortcuts import render
from django.http import HttpResponse, request, JsonResponse
from django.views.generic import View
import os
from django.conf import settings
from datetime import datetime
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    # print (dir(request))
    return render (request, 'mixer/home.html')
