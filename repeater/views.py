from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
# Create your views here.

def home(request):
    context = {
        'wav': 'a_-1.wav'
    }
    return render(request, 'repeater/home.html', context=context)

def get_recorded_audio(request):
    audio_file = request.body
    with open('test.wav', 'wb') as file:
        file.write(audio_file)
    messages.success(request, 'Файл отправлен на сервер!')
    #return render(request, 'repeater/home.html', context=context)
    return redirect('repeater-home')
