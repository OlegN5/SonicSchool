from django.urls import path, include
   
from repeater import views as repeater_views
   

urlpatterns = [


    path('', repeater_views.Index.index, name='index'), 
       
    path('home/', repeater_views.Index.home, name='homeRepeater'), 

    path('home/get_recorded_audio/',
        repeater_views.Index.get_recorded_audio, name='get_recorded_audio'),
    

    path('message2u/', repeater_views.message2u.as_view(), name='message2u'),
    # path('get_recorded_audio/',
    #     repeater_views.get_recorded_audio.as_view(), name='get_recorded_audio')
   ]