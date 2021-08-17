from django.shortcuts import render, redirect
from django.http import HttpResponse, request, JsonResponse
from django.contrib import messages
from . import analysis_audio
from django.views.generic import View

# Create your views here.

class Index(View):
    def home(request):
        context = {
            'wav': 'a_-1.wav',
            'mp3': 'a_-1.mp3',
            # 'message_2u': 'message_2u'
            #'wav': 'do.wav'
        }
        return render(request, 'repeater/home.html', context=context)

    def index(request):
        return redirect('home')

    def get_recorded_audio(request):
        audio_file = request.body
        # with open('test.wav', 'wb') as file:
        with open('test.mp3', 'wb') as file:   
            file.write(audio_file)
        messages.success(request, 'Файл отправлен на сервер!')
        return render(request, 'repeater/home.html')
    
    # return redirect('home')


class message2u(View):
    def post(self, request):
        # print ('request', request)
        message_2u = analysis_audio.start()
        # print('message_2u!!!!!!!!', message_2u)
        # print(JsonResponse({'message_2u': message_2u}, status=200))
        return JsonResponse({
            'message_2u': message_2u,
            'status':'ok'
            }, status=200)


       