from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
#import librosa
#import numpy
#import IPython.display as ipd
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
    return redirect('home')

'''def load_audio():
    audio_data = 'resources/a_-1.wav'
    librosa.load(audio_data, sr=44100)
    ipd.Audio(audio_data) # проиграть
    x, sr = librosa.load(audio_data, sr=44100) # может и так сразу здесь задать передискретизацию

    print(type(x), type(sr))
    #<class 'numpy.ndarray'> <class 'int'>
    print(x.shape, sr)
    #(94316,) 22050'''
