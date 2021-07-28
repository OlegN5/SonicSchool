from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from . import analysis_audio
# Create your views here.


def home(request):
  
    context = {
        'wav': 'a_-1.wav',
        #'wav': 'do.wav',
        'message_2u': '0'
    }
    return render(request, 'repeater/home.html', context=context)

def get_recorded_audio(request):
    audio_file = request.body
    with open('test.wav', 'wb') as file:
        file.write(audio_file)
    messages.success(request, 'Файл отправлен на сервер!')

    message_2u = analysis_audio.start()
    
    return HttpResponse(message_2u)
    # return render(request, 'repeater/home.html', {"message_2u": message_2u})

    # return redirect('home')
