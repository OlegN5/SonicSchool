from django.shortcuts import render
from django.http import HttpResponse, request, JsonResponse
from django.views.generic import View
import os
from django.conf import settings
from datetime import datetime
from django.contrib.auth.decorators import login_required


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
        cs = request.POST['csrfmiddlewaretoken']
        dataNow = datetime.now()
        log = f'{dataNow}\t{sound1}\t{volume1}\t{sound2}\t{volume2}\t{result}\t{cs}\n'
        fileNameRec = os.path.join(settings.BASE_DIR, 'media', 'volumer', 'logs', 'volumer.log')
        # print (fileNameRec + '.wav')
        with open(fileNameRec, 'a+') as file:
            file.write(log)

        return JsonResponse({
            'result': result,
            'volume1': volume1,
            'volume2': volume2,
            'status':'ok'
            }, status=200)