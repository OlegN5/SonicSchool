# Generated by Django 3.1.6 on 2022-04-05 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('volumer', '0002_auto_20220405_1537'),
    ]

    operations = [
        migrations.AddField(
            model_name='score',
            name='result',
            field=models.CharField(default=0, max_length=6),
            preserve_default=False,
        ),
    ]