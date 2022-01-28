from django.shortcuts import render
from django.http import HttpResponse, request, JsonResponse
from django.views.generic import View
import os
from django.conf import settings
from datetime import datetime



def index(request):
    # print (dir(request))
    return render (request, 'wider/home.html')


class result(View):
    def post(self, request):
        # json_data = json.loads(request.body)
        # print('fff')
        # print(request.POST)
        pan1 = request.POST['pan1']
        pan2 = request.POST['pan2']
        result = request.POST['result']
        sound1 = request.POST['sound1']
        sound2 = request.POST['sound2']
        cs = request.POST['csrfmiddlewaretoken']
        dataNow = datetime.now()
        log = f'{dataNow}\t{sound1}\t{pan1}\t{sound2}\t{pan2}\t{result}\t{cs}\n'
        fileNameRec = os.path.join(settings.BASE_DIR, 'media', 'wider', 'logs', 'wider.log')
        # print (fileNameRec + '.wav')
        with open(fileNameRec, 'a+') as file:
            file.write(log)

        return JsonResponse({
            'result': result,
            'pan1': pan1,
            'pan2': pan2,
            'status':'ok'
            }, status=200)