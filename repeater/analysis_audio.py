from . import display
from . import display2
import sys
import ctcsound
import librosa
import librosa.display
import numpy
#import IPython.display as ipd #для проигрывания аудио скорее всего не нужно
import matplotlib.pyplot as plt
import plotly
import plotly.graph_objs as go
import plotly.express as px
from plotly.subplots import make_subplots
import numpy as np
import pandas as pd
from playsound import playsound





def start():
    #display.plot(load_audio())
    #display2.plot(load_audio())
    #load_audio()
    #spectral_bandwidth2 (load_audio())

    #print (spectral_bandwidth2(load_audio()[0], 44100))
    #print (spectral_bandwidth2(load_audio()[1], 44100))
    y, y1 = load_audio()
    #print (len(colorgram(y, 44100)))
    nota = 18# случайно выбранный звук
    cg = colorgram(y1, 44100)# !!!!!!!!!!!!!!!!!!!ЕСЛИ УБРАТЬ У ИГРЕКА ЕДИНИЦУ МОЖНО ВЫВЕСТИ ГРАФИК ЭТАЛОННОГО ЗВУКА И ПРОВЕРИТЬ ЕГО ПРОХОЖДЕНИЕ ТЕСТА)))
    #print (len(colorgram(y, 44100)))
    notes = ['до', 'до+', 'до#', 'до#+', 'ре', 'ре+', 'ре#','ре#+', 'ми', 'ми+', 'фа', 'фа+', 'фа#', 'фа#+', 'соль', 'соль+', 'соль#', 'соль#+', 'ля', 'ля+', 'ля#', 'ля#+', 'си', 'си+']
    sumscore_l = []
    for c in range(24):
        sumscore = sum(cg[c])/len(cg[c])
        sumscore_l.append(sumscore)
        if sumscore > .05:
            print (f"звук-{notes[c]}-\t{sumscore}")

    print (sumscore_l)

    kvinta = nota - 10
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






    #print (len(cg))
    #print (cg)








    #print(spectral_bandwidth2 (load_audio()))

    #cs_sound()
    #load_audio()




def load_audio():
    #audio_data = 'repeater/static/sounds/a_-1.wav'
    audio_data_user = 'test.wav'#!!!!!!!!!!!!ЭТО ПУТЬ К ЗАПИСАННОМУ ФАЙЛУ
    #audio_data_user = 'rec_voice/a_02.wav' !!!!!!!!!!ЗДЕСЬ МОИ ТЕСТОВЫЕ ФАЙЛЫ МОЖЕШЬ НА НИХ ПОСМОТРЕТЬ ДЕЙСТВИЕ!!!!!!!!
    audio_data_ton = 'repeater/static/sounds/a_-1.wav'
    playsound(audio_data_ton)
    playsound(audio_data_user)




    sr = 44100
    #librosa.load(audio_data, sr)
    #ipd.Audio(audio_data) # проиграть

    # может и так сразу здесь задать передискретизацию;
    #это функция для получения формы волны для отображения
    y, sr = librosa.load(audio_data_ton, sr)#sr=44100 можно вставить и уменьшить код
    y1, sr = librosa.load(audio_data_user, sr)







    return y, y1#, sr



def spectral_bandwidth2 (y, sr):

    spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr, p=2)
    return spec_bw




def wave_form_visual (y, sr):
    #print(type(y), type(sr))
    #<class 'numpy.ndarray'> <class 'int'>
    #print(y.shape, sr)
    #print(y, sr)
    #(94316,) 22050

    #график массива аудио:
    '''plt.figure(figsize=(14, 5))
    librosa.display.waveplot(y, sr=sr)
    #plt.show()#раскомментить чтобы увидеть'''

    #вывод графика с помощью plotly интерактивный
    '''x = np.arange(0, 88200, 1)# формируем список отсчетов

    #fig = px.scatter(x=x1, y=f(x1))
    fig = px.scatter(x=x, y=y)# по моему оси наоборот...
    fig.show()'''

    #вывод графика с помощью matplotlib.pyplot более продвинуто из оф док
    '''так то работает но пока нет необходимости
    y, sr = librosa.load(librosa.ex('choice'), duration=2)
    fig, ax = plt.subplots(nrows=1, sharex=True, sharey=True)
    librosa.display.waveplot(y, sr=sr, ax=ax[0])
    ax[0].set(title='Monophonic')
    ax[0].label_outer()
    plt.show()'''
    #Отобразить спектрограмму можно с помощью
    '''Y = librosa.stft(y)
    Ydb = librosa.amplitude_to_db(abs(Y))
    plt.figure(figsize=(14, 5))
    librosa.display.specshow(Ydb, sr=sr, x_axis='time', y_axis='hz')
    plt.colorbar()'''

    #Отобразить LOG спектрограмму можно с помощью
    '''Y = librosa.stft(y)
    Ydb = librosa.amplitude_to_db(abs(Y))
    plt.figure(figsize=(14, 5))
    librosa.display.specshow(Ydb, sr=sr, x_axis='time', y_axis='log')
    plt.colorbar()'''

    #Создание аудиосигнала:
    '''sr = 22050 # частота дискретизации
    T = 5.0    # секунды
    t = np.linspace(0, T, int(T*sr), endpoint=False) # переменная времени
    y = 0.5*np.sin(2*np.pi*220*t) # чистая синусоидная волна при 220 Гц
    # проигрывание аудио
    ipd.Audio(y, rate=sr) # загрузка массива NumPy
    # сохранение аудио
    librosa.output.write_wav('tone_220.wav', y, sr)'''




def crossings (y, sr):

#_________________________________________________________________
    # Скорость пересечения нуля
    # Построение графика сигнала:
    '''plt.figure(figsize=(14, 5))
    librosa.display.waveplot(y, sr=sr)#'''
    # Увеличение масштаба:
    n0 = 40000
    n1 = 44100 + n0# Это типа за секунду
    plt.figure(figsize=(14, 5))
    plt.plot(y[n0:n1])
    plt.grid()

 #для тона
    zero_crossingsn2n_t = librosa.zero_crossings(y[n0:n1], pad=False)#1000ms
    zero_crossings_all_t = librosa.zero_crossings(y, pad=False)# всего аудио в моем случае 2 секунды
# для записи пользователя
    zero_crossingsn2n_u = librosa.zero_crossings(y1[n0:n1], pad=False)#1000ms
    zero_crossings_all_u = librosa.zero_crossings(y1, pad=False)# всего аудио


    print('в сигнале тона (за 1000 мс) пересечений 0', sum(zero_crossingsn2n_t))
    print('в сигнале тона (файла полностью) пересечений 0', sum(zero_crossings_all_t))
    print('в сигнале пользователя (за 1000 мс) пересечений 0', sum(zero_crossingsn2n_u))
    print('в сигнале пользователя (файла полностью) пересечений 0', sum(zero_crossings_all_u))


    #'''
def colorgram (y, sr):
#понять распределение идет именно по деленю октавы?????? а при параметре n_chroma 24 48
    #цветность!!!
    '''librosa.feature.chroma_stft(y=None, sr=22050, S=None, norm=inf, n_fft=2048, hop_length=512, win_length=None, window='hann', center=True, pad_mode='reflect', tuning=None, n_chroma=12, **kwargs)
'''
    hop_length = 1024

    #chromagram = librosa.feature.chroma_stft(y, sr=sr, n_fft=2048, hop_length=hop_length, n_chroma=n)
    #librosa.feature.chroma_cqt(y=None, sr=22050, C=None, hop_length=512, fmin=None, norm=inf, threshold=0.0, tuning=None, n_chroma=12, n_octaves=7, window=None, bins_per_octave=36, cqt_mode='full')
    chromagram = librosa.feature.chroma_cqt(y, sr=sr, hop_length=hop_length, n_chroma=24, bins_per_octave = 96, fmin=110, threshold = .049, n_octaves=3)


    plt.figure(figsize=(15, 6))

    #librosa.display.specshow(chromagram, x_axis='time', y_axis='chroma', hop_length=hop_length, cmap='coolwarm')

    #plt.show()#раскомментить чтобы увидеть


    frames = range(len(chromagram[0]))
    t = librosa.frames_to_time(frames)

    librosa.display.waveplot(y, sr=sr, alpha=0.4)
    #plt.plot(t, normalize(spectral_centroids), color='g')

    colors = ['xkcd:purple' , 'xkcd:pinkish tan','xkcd:spruce' ,'xkcd:strong blue' ,'xkcd:toxic green','xkcd:cloudy blue', 'xkcd:dark pastel green', 'xkcd:dust','xkcd:electric lime','xkcd:fresh green','xkcd:yellow' ,'xkcd:nasty green' ,'xkcd:really light blue' , 'xkcd:tea','xkcd:warm purple','xkcd:yellowish tan' ,'xkcd:burnt sienna' , 'xkcd:dark grass green','xkcd:fuchsia' , 'xkcd:bright green', 'xkcd:bright red' , 'xkcd:pinkish tan','xkcd:spruce' ,'xkcd:strong blue' ,'xkcd:dark magenta' ,'xkcd:windows blue' ,'xkcd:blue blue' ,'xkcd:blue with a hint of purple','xkcd:cloudy blue', 'xkcd:dark pastel green', 'xkcd:dust','xkcd:electric lime','xkcd:fresh green','xkcd:light eggplant' ,'xkcd:nasty green' ,'xkcd:really light blue' , 'xkcd:tea','xkcd:warm purple','xkcd:yellowish tan' ,'xkcd:cement' , 'xkcd:dark grass green','xkcd:dusty teal' , 'xkcd:grey teal', 'xkcd:macaroni and cheese' , 'xkcd:pinkish tan','xkcd:spruce' ,'xkcd:strong blue' ,'xkcd:toxic green' ,'xkcd:windows blue' ,'xkcd:blue blue' ,'xkcd:blue with a hint of purple' ]

    notes = ['до', 'до+', 'до#', 'до#+', 'ре', 'ре+', 'ре#','ре#+', 'ми', 'ми+', 'фа', 'фа+', 'фа#', 'фа#+', 'соль', 'соль+', 'соль#', 'соль#+', 'ля', 'ля+', 'ля#', 'ля#+', 'си', 'си+']
    #notes = ['до', 'до#', 'ре', 'ре#', 'ми', 'фа','фа#', 'соль', 'соль#', 'ля','ля#', 'си']

    for ch in range(24):#????????????????????????????????????????????????????n-1 было
        plt.plot(t, chromagram[ch], color=colors[ch])






    #plt.legend(('до', 'до#', 'ре', 'ре#', 'ми', 'фа','фа#', 'соль', 'соль#', 'ля','ля#', 'си'))
    plt.legend(notes)
    plt.show()#раскомментить чтобы увидеть










    return chromagram









    '''print('-'*50)
    print(Y[0][0])
    print(Y[1][0])

    print('-'*50)
    print(Y[0])

    print('-'*50)
    print(Y[1])'''

#return x, sr



def spectral_bandwidth(y, sr):
    #вычисляет спектральный центроид для каждого фрейма в сигнале:
    #по тестам не совсем совпадает с частотой сигнала
    #нужны еще тесты и может найдется соответствие
    #может нужно выбрать другой метод а этот будет уточнять значение
    import sklearn
#центроид для тона
    spectral_centroids = librosa.feature.spectral_centroid(y, sr=sr)[0]
    spectral_centroids.shape
    (775,)
    # Вычисление временной переменной для визуализации
    plt.figure(figsize=(12, 4))
    frames = range(len(spectral_centroids))
    t = librosa.frames_to_time(frames)
    # Нормализация спектрального центроида для визуализации
    '''def normalize(y, axis=0):
        return sklearn.preprocessing.minmax_scale(y, axis=axis)'''
    # Построение спектрального центроида вместе с формой волны
    librosa.display.waveplot(y, sr=sr, alpha=0.4)
    #plt.plot(t, normalize(spectral_centroids), color='b')#'''
    plt.plot(t, spectral_centroids, color='b')#'''

# центроид для юзера
    spectral_centroids = librosa.feature.spectral_centroid(y1, sr=sr)[0]
    spectral_centroids.shape
    (775,)
    # Вычисление временной переменной для визуализации
    plt.figure(figsize=(12, 4))
    frames = range(len(spectral_centroids))
    t = librosa.frames_to_time(frames)
    # Нормализация спектрального центроида для визуализации
    '''def normalize(y1, axis=0):
        return sklearn.preprocessing.minmax_scale(y1, axis=axis)'''
    # Построение спектрального центроида вместе с формой волны
    librosa.display.waveplot(y1, sr=sr, alpha=0.4)
    #plt.plot(t, normalize(spectral_centroids), color='g')
    plt.plot(t, spectral_centroids, color='g')
    plt.show()#раскомментить чтобы увидеть'''




def cs_sound():
    '''синтезирует и воспроизводит звук на сервере...'''
    csd_text = '''
      <CsoundSynthesizer>
      <CsOptions>
        -odac
      </CsOptions>
      <CsInstruments>
      instr 1
        out(linen(oscili(p4,p5),0.1,p3,0.1))
      endin
      </CsInstruments>
      <CsScore>
      i1 0 5 1000 440
      </CsScore>
      </CsoundSynthesizer>'''

    cs = ctcsound.Csound()
    result = cs.compileCsdText(csd_text)
    result = cs.start()
    while True:
        result = cs.performKsmps()
        if result != 0:
            break
    result = cs.cleanup()
    cs.reset()
    del cs
    #sys.exit(result)#??? выдает ошибку если функция вызывается из home()
