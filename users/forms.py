from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from .models import Profile

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:

        model = User
        fields = ['username', 'email', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):

    class Meta:

        model = User
        fields = ['first_name', 'last_name']

class ProfileUpdateForm(forms.ModelForm):

    class Meta:

        model = Profile
        fields = ['image']