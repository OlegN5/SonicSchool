from django.urls import path, include
   
from repeater import views as repeater_views
   

urlpatterns = [
   
    path('home/', repeater_views.Index.home, name='home'), 

    path('get_recorded_audio',
        repeater_views.Index.get_recorded_audio, name='get-recorded-audio'),

    path('message2u/', repeater_views.message2u.as_view(), name='message2u')
   ]