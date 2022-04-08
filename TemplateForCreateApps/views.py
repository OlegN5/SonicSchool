from django.shortcuts import render
from django.http import HttpResponse, request, JsonResponse
from django.views.generic import View
from django.conf import settings
from datetime import datetime
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    context = {
        'title': 'INTONATION'
    }
    # print (dir(request))
    return render (request, 'intonation/home.html', context=context)

