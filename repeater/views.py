from django.shortcuts import render, redirect
from django.http import HttpResponse, request, JsonResponse
from django.contrib import messages
from . import analysis_audio
from django.views.generic import View
from django.conf import settings
import os
import random
import json
from datetime import datetime
from django.contrib.auth.decorators import login_required




#fileNameRec = os.path.join(settings.BASE_DIR,'test.wav')

# Create your views here.
@login_required
class Index(View):
    def home(request):
        notes = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
        random.shuffle(notes)
        note = notes.pop()
        print (note)
           
        context = {
            'title': 'REPEATER',
            'wav': str(note) + '.wav',
            'mp3': str(note) + '.mp3',
             # 'message_2u': 'message_2u'
             # 'wav': 'do.wav'
        }
        return render(request, 'repeater/home.html', context=context)

    def index(request):
        return redirect('homeRepeater')

    def get_recorded_audio(request):
        audio_file = request.body
        fileName = createNameRec()
        fileNameRec = os.path.join(settings.BASE_DIR, 'media', 'repeater', 'records', fileName)
        # print (fileNameRec + '.wav')
        with open(os.path.join(fileNameRec + '.wav'), 'wb+') as file:
            file.write(audio_file)
        #messages.success(request, 'Файл отправлен на сервер!')
        return JsonResponse({
            'fileName': fileName,
            'status':'ok'
            }, status=200)



        #return render(request, 'repeater/home.html')


       

def createNameRec():
    #add to fileName user_name
    recName = datetime.now().isoformat(timespec='microseconds')
    print (recName)
    recName = recName.replace(':','-')
    print (recName)
    return recName



# class get_recorded_audio(View):
#     def post(self, request):
#         audio_file = request.FILES['audio']
#         print ('!!!audio_file!!!',  audio_file)
#         with open(os.path.join(settings.BASE_DIR, 'test.wav'), 'wb') as file:
#             file.write(audio_file)
#         messages.success(request, 'Файл отправлен на сервер!')
#         return JsonResponse({
#             'status':'ok'
#             }, status=200)



class message2u(View):
    def post(self, request):
        # json_data = json.loads(request.body)
        wav = request.POST['wav']
        fileName = request.POST['fileName']
        fileNameRec = os.path.join(settings.BASE_DIR, 'media', 'repeater', 'records', fileName + '.wav')
        # print ('!!!wav!!!',  wav)
        # print ('!!!fileNameRec!!!',  fileNameRec)
        message_2u = analysis_audio.start(int(wav), fileNameRec)
        # print('message_2u!!!!!!!!', message_2u)
        # print(JsonResponse({'message_2u': message_2u}, status=200))
        return JsonResponse({
            'message_2u': message_2u,
            'status':'ok'
            }, status=200)

