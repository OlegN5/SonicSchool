from django.shortcuts import render, redirect, reverse
from django.contrib import messages
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from .models import Profile
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import Http404

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data.get('email')
            if User.objects.filter(email=email).first() == None:
                form.save()
                username = form.cleaned_data.get('username')
                messages.success(request, f'Учетная запись создана для {username}')
                return redirect('login')
            else:
                messages.error(request, f'Пользователь с такой почтой уже существует')

    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', context={'form':form})

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user is None:
            try:
                user_temp = User.objects.get(username=username)
            except Exception as exc:
                user_temp = None

            if user_temp is not None and user_temp.check_password(password):
                return redirect('activate', username=username)
            messages.error(request,'Имя пользователя и/или пароль неверны!')
        else:
            auth_login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request,'users/login.html', {'form':form})

@login_required
def profile(request):
    profile = Profile.objects.filter(user_id=request.user.id).first()
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(
            request.POST, 
            request.FILES, 
            instance=request.user.profile
        )

        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, f'Профиль обновлен')
            return redirect('profile')
        else:
            messages.error(request, f'Профиль НЕ обновлен')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form,
        'profile': profile,
    }
    return render(request, 'users/profile.html', context=context)

