from tkinter import N
from django.shortcuts import render
from django.http import HttpResponse, request, JsonResponse
from django.views.generic import View
import os
from django.conf import settings
from datetime import datetime
from django.contrib.auth.decorators import login_required
from .models import Score





@login_required
def index(request):
    # print (dir(request))
    return render (request, 'volumer/home.html')


class result(View):
    def post(self, request):
        # json_data = json.loads(request.body)
        # print('fff')
        # print(request.POST)
        volume1 = request.POST['volume1']
        volume2 = request.POST['volume2']
        result = request.POST['result']
        sound1 = request.POST['sound1']
        sound2 = request.POST['sound2']
        play1BtnClick = request.POST['play1BtnClick']
        play2BtnClick = request.POST['play2BtnClick']
        cs = request.POST['csrfmiddlewaretoken']
        dataNow = datetime.now()
        
        sc = Score (
            learner = request.user,
            note1 = sound1,
            volume1 = float(volume1),
            click1 = play1BtnClick,
            note2 = sound2,
            volume2 = float(volume2),
            click2 = play2BtnClick,
            result = result
            # timer = models.DateTimeField,
        )

        sc.save()
        log = f'{dataNow}\t{sound1}\t{volume1}\t{sound2}\t{volume2}\t{result}\t{cs}\n'
        fileNameRec = os.path.join(settings.BASE_DIR, 'media', 'volumer', 'logs', 'volumer.log')
        # print (fileNameRec + '.wav')
        with open(fileNameRec, 'a+') as file:
            file.write(log)

        # obj = Score.objects.last()
        # items = obj.id
        objs = Score.objects.all()

        


        clicks=0
        items=0
        oks=0
        resultOk=0
        resultErr=0

        for obj in Score.objects.all():
            if request.user == obj.learner:
                clicks+=obj.click1 + obj.click2
                items+=1
                if obj.result == 'OK!':
                    resultOk+=1
                if obj.result == 'NO...':
                    resultErr+=1

        

   
            


        print(items)
            
            # 'Oks': '',
            # 'Errors': ''

        return JsonResponse({
            'result': result,
            'volume1': volume1,
            'volume2': volume2,
            'status': 'ok',
            'messages': '!!!messages!!!',
            'items': items,
            'clicks': clicks,	
            'resultOk': resultOk,
            'resultErr': resultErr

            }, status=200)