from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from .models import ChatMessage
from django.db import models

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        if password == confirm_password:
            try:
                user = User.objects.create_user(username=username, password=password)
                user.save()
                login(request, user)
                return redirect('home')
            except:
                messages.error(request, 'Username already exists.')
        else:
            messages.error(request, 'Passwords do not match.')
    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'login.html')

@login_required
def user_list_view(request):
    users = User.objects.all()  # Fetch all users
    return render(request, 'user_list.html', {'users': users})

@login_required
def chat_view(request, recipient_id):
    recipient = get_object_or_404(User, id=recipient_id)
    
    if request.method == 'POST':
        message = request.POST.get('message')
        if message:
            ChatMessage.objects.create(sender=request.user, recipient=recipient, message=message)
    
    messages = ChatMessage.objects.filter(
        models.Q(sender=request.user, recipient=recipient) |
        models.Q(sender=recipient, recipient=request.user)
    ).order_by('timestamp')
    
    return render(request, 'chat.html', {'recipient': recipient, 'messages': messages})

@login_required
def profile_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = request.user
        if email:
            user.email = email

        if password:
            user.set_password(password)
            user.save()
        messages.success(request, 'Profile updated successfully!')
    
    return render(request, 'profile.html')

@login_required
def support_view(request):
    if request.method == 'POST':
        issue = request.POST.get('issue')
        # Handle issue submission here (e.g., save to DB)
        messages.success(request, 'Support request submitted successfully.')
        return redirect('support')
    
    return render(request, 'support.html')

def home(request):
    return render(request, 'home.html')

def logout_view(request):
    logout(request)
    return render(request, 'logout.html')
