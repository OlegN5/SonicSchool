from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_lenght=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, 
    on_delete=models.CASCADE)
    choise_text = models.CharFields(max_lenght=200)
    votes = models.IntegerField(default=0)
    