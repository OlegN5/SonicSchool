from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse

class Score(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    note1 = models.CharField(max_length=10)
    volume1 = models.FloatField(default=0)
    click1 = models.IntegerField(default=0)
    note2 = models.CharField(max_length=10)
    volume2 = models.FloatField(default=0)
    click2 = models.IntegerField(default=0)
    timer = models.DateTimeField(default='2012-09-04 06:00:00.000000-08:00')


    # title = models.CharField(max_length=100)
    # content = models.TextField()
    # date_posted = models.DateTimeField(default=timezone.now)


    # def __str__(self):
    #     return self.title

    def get_absolute_url(self):
        return reverse ('volume-score-detail', kwargs={'pk':self.pk})
