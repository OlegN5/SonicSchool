import os
from django.db.models.signals import post_save, pre_save
from django.contrib.auth.models import User
from .models import Profile
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(pre_save, sender=Profile)
def delete_old_file(sender, instance, **kwargs):
    # on creation, signal callback won't be triggered 
    if instance._state.adding and not instance.pk:
        return False
    
    try:
        old_image = sender.objects.get(pk=instance.pk).image
        if old_image.name.find('default.png') != -1:
            return False
    except sender.DoesNotExist:
        return False
    
    # comparing the new file with the old one
    new_image = instance.image
    if not old_image == new_image:
        if os.path.isfile(old_image.path):
            os.remove(old_image.path)