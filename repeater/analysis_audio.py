# -*- coding: utf-8 -*-
# from . import display

import sys

import librosa

from django.conf import settings

import os

# import librosa.display
# import matplotlib.pyplot as plt
# from playsound import playsound

colors = ['xkcd:purple', 'xkcd:pinkish tan', 'xkcd:spruce', 'xkcd:strong blue'
    , 'xkcd:toxic green', 'xkcd:cloudy blue', 'xkcd:dark pastel green', 'xkcd:dust'
    , 'xkcd:electric lime', 'xkcd:fresh green', 'xkcd:yellow', 'xkcd:nasty green'
    , 'xkcd:really light blue', 'xkcd:tea','xkcd:warm purple','xkcd:yellowish tan'
    , 'xkcd:burnt sienna', 'xkcd:dark grass green','xkcd:fuchsia', 'xkcd:bright green'
    , 'xkcd:bright red', 'xkcd:pinkish tan','xkcd:spruce', 'xkcd:strong blue'
    , 'xkcd:dark magenta', 'xkcd:windows blue', 'xkcd:blue blue'
    , 'xkcd:blue with a hint of purple', 'xkcd:cloudy blue', 'xkcd:dark pastel green'
    , 'xkcd:dust', 'xkcd:electric lime', 'xkcd:fresh green', 'xkcd:light eggplant'
    , 'xkcd:nasty green', 'xkcd:really light blue', 'xkcd:tea', 'xkcd:warm purple'
    , 'xkcd:yellowish tan', 'xkcd:cement', 'xkcd:dark grass green', 'xkcd:dusty teal'
    , 'xkcd:grey teal', 'xkcd:macaroni and cheese', 'xkcd:pinkish tan','xkcd:spruce'
    , 'xkcd:strong blue', 'xkcd:toxic green', 'xkcd:windows blue','xkcd:blue blue'
    , 'xkcd:blue with a hint of purple']

notes = ['C  ', 'C+ ', 'C# ', 'C#+', 'D  ', 'D+ ', 'D# ', 'D#+', 'E  ', 'E+ '
, 'F  ', 'F+ ', 'F# ', 'F#+', 'G  ', 'G+ ', 'G# ', 'G#+', 'A  ', 'A+ '
, 'B  ', 'B+ ', 'H  ', 'H+ ']# for n_chroma = 24

def start(nota, fileNameRec): # случайно выбранный звук
    print (nota)
    print (notes[nota])
    message_2u = f'Воспроизведен звук {notes[nota]}\n'
    
    y, y1 = load_audio(nota, fileNameRec)
    cg = colorgram(y1, 44100)# !!!!!!!!!!!!!!!!!!!ЕСЛИ УБРАТЬ У ИГРЕКА ЕДИНИЦУ МОЖНО ВЫВЕСТИ ГРАФИК ЭТАЛОННОГО ЗВУКА И ПРОВЕРИТЬ ЕГО ПРОХОЖДЕНИЕ ТЕСТА)))

    sumscore_l = []
    mData = {}
    for c in range(24):
        sumscore = round(sum(cg[c])/len(cg[c]),4)
        sumscore_l.append(sumscore)
        mData[notes[c]] = [sumscore_l[c]]
        # if sumscore > .05:
        #     print (f"звук - {notes[c]} - \t{sumscore}")
        #     message_2u += f"<p>звук - {notes[c]} - \t{sumscore}</p>"

    list_d = list(mData.items())
    list_d.sort(key=lambda i: i[1])

   
    message_2u += f'В записи\nсодержатся тоны:\n'
    b = 0
    for i in reversed(list_d):
        b += 1
        print(i[0], ':', i[1])
        message_2u += f'звук {i[0]}\t{i[1]}\n'
        if b == 4:
            break

    if nota > 9:
        kvinta = nota - 10
    else:
        kvinta = nota + 14

    k_note = sumscore_l[nota]
    sumscore_l[nota] = 0
    k_kvinta = sumscore_l[kvinta]
    sumscore_l[kvinta] = 0
    k_laza = round(sum (sumscore_l), 4)

    message_2u +='*'*10 + '\n'
    
    message_2u += f'тон {notes[nota]} \t{k_note}\n'
    print ('***')
    print(f"звук {notes[nota]}\t{k_note}")
    print ('***')


    message_2u += f'Ч.5 {notes[kvinta]}\t{k_kvinta}\n'
    print ('***')
    print(f"квинта {notes[kvinta]}\t{k_kvinta}")
    print ('***')
    message_2u += f'суммарная лажа)))\t{k_laza}\n'
    print ('***')
    print(f"суммарная лажа))) \t{k_laza}")
    print ('***')
    message_2u += '*'*10 + '\n'
    
    if k_note > k_laza:
        message_2u += 'GOOD!\n'
    else:
        message_2u += 'Хреново...,\n'
        if k_note > .915:
            message_2u +='но есть надежда!'
        else:
            message_2u += 'очень хреново...'
    return (message_2u)



def load_audio(nota, fileNameRec):
    sr = 44100
    audio_data_user = fileNameRec
    audio_data_ton = os.path.join(settings.STATIC_ROOT,'repeater/sounds/' + str(nota) + '.wav')
    y, sr = librosa.load(audio_data_ton, sr)
    y1, sr = librosa.load(audio_data_user, sr)
    return y, y1


def colorgram (y, sr):
    '''librosa.feature.chroma_cqt(y=None, sr=22050, C=None, hop_length=512
    , fmin=None, norm=inf, threshold=0.0, tuning=None, n_chroma=12
    , n_octaves=7, window=None, bins_per_octave=36, cqt_mode='full')
    '''
    '''librosa.feature.chroma_stft(y=None, sr=22050, S=None, norm=inf
    , n_fft=2048, hop_length=512, win_length=None, window='hann', center=True
    , pad_mode='reflect', tuning=None, n_chroma=12, **kwargs)
    '''

    #chromagram = librosa.feature.chroma_stft(y, sr=sr, n_fft=2048, hop_length=hop_length, n_chroma=n)
    #не удовлетворен работой, может не доконца разобрался n_chroma выдает непредсказуемый результат
    # не увеличиввается разрешение а почему то типа октав добавляется - - что странно
    chromagram = librosa.feature.chroma_cqt(y, sr=sr, hop_length=1024
    , n_chroma=24, bins_per_octave = 96, fmin=110, threshold = .049, n_octaves=3)
    # plt.figure(figsize=(15, 6))

    #librosa.display.specshow(chromagram, x_axis='time', y_axis='chroma', hop_length=hop_length
    #, cmap='coolwarm')# построение отображения цветности нот на спектре

    # frames = range(len(chromagram[0]))
    # t = librosa.frames_to_time(frames)
    # librosa.display.waveplot(y, sr=sr, alpha=0.4)
    # for ch in range(24):
    #     plt.plot(t, chromagram[ch], color=colors[ch])
    # plt.legend(notes)
    # plt.show()#раскомментить чтобы увидеть
    return chromagram
