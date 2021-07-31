from django.shortcuts import render, redirect
from django.http import HttpResponse, request
from django.contrib import messages
from . import analysis_audio
from django.views.generic import View
from django.http import JsonResponse
# Create your views here.

<<<<<<< HEAD
class Index(View):
    def home(request):
        context = {
            'wav': 'a_-1.wav',
            # 'message_2u': 'message_2u'
            #'wav': 'do.wav'
        }
        return render(request, 'repeater/home.html', context=context)

    def get_recorded_audio(request):
        audio_file = request.body
        with open('test.wav', 'wb') as file:
            file.write(audio_file)
        messages.success(request, 'Файл отправлен на сервер!')
        return render(request, 'repeater/home.html')
    
    # return redirect('home')

=======

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
>>>>>>> f8c54602faf9ba07de36382a517e1c8631ed8e7a

class message2u(View):
    def post(self, request):
        print ('request', request)
        message_2u = analysis_audio.start()
        print('message_2u!!!!!!!!', message_2u)
        return JsonResponse({'message_2u': message_2u}, status=200)


       