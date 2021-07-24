# -*- coding: utf-8 -*-
from . import display
import sys
import librosa
import librosa.display
import matplotlib.pyplot as plt
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

notes = ['C', 'C+', 'C#', 'C#+', 'D', 'D+', 'D#', 'D#+', 'E', 'E+'
, 'F', 'F+', 'F#', 'F#+', 'G', 'G+', 'G#', 'G#+', 'A', 'A+'
, 'B', 'B+', 'H', 'H+']# for n_chroma = 24

def start():
    y, y1 = load_audio()
    nota = 18# случайно выбранный звук
    cg = colorgram(y1, 44100)# !!!!!!!!!!!!!!!!!!!ЕСЛИ УБРАТЬ У ИГРЕКА ЕДИНИЦУ МОЖНО ВЫВЕСТИ ГРАФИК ЭТАЛОННОГО ЗВУКА И ПРОВЕРИТЬ ЕГО ПРОХОЖДЕНИЕ ТЕСТА)))

    sumscore_l = []
    for c in range(24):
        sumscore = sum(cg[c])/len(cg[c])
        sumscore_l.append(sumscore)
        if sumscore > .05:
            print (f"звук - {notes[c]} - \t{sumscore}")

    if nota > 9:
        kvinta = nota - 10
    else:
        kvinta = nota + 14

    k_note = sumscore_l[nota]
    sumscore_l[nota] = 0
    k_kvinta = sumscore_l[kvinta]
    sumscore_l[kvinta] = 0
    k_laza = sum (sumscore_l)

    print ('*'*50)
    print (f"звук-{notes[nota]}-\t{k_note}")
    print (f"звук-{notes[kvinta]}-\t{k_kvinta}")
    print (f"звук-'ЛАЖА'-\t{k_laza}")
    print ('*'*50)
    print ('*'*50)
    print (' ')
    if k_note > k_laza:
        print ("GOOD!")
    else:
        print ('Хреново...,')

    if k_note > .915:
        print ("но есть надежда!")
    else:
        print ('очень хреново...')
    print (' ')
    print ('*'*50)
    print ('*'*50)


def load_audio():
    sr = 44100
    audio_data_user = 'test.wav'#!!!!!!!!!!!!ЭТО ПУТЬ К ЗАПИСАННОМУ ФАЙЛУ
    #audio_data_user = 'rec_voice/a_02.wav' #!!!!!!!!!!ЗДЕСЬ МОИ ТЕСТОВЫЕ ФАЙЛЫ МОЖЕШЬ НА НИХ ПОСМОТРЕТЬ ДЕЙСТВИЕ!!!!!!!!
    audio_data_ton = 'repeater/static/sounds/a_-1.wav'
    # playsound(audio_data_ton) # пришлось комментить
    # playsound(audio_data_user) # пришлось комментить
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
