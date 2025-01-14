from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import ChatMessage


def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        email = request.POST['email']
        
        if password == confirm_password:
            try:
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                login(request, user)  # Automatically log in the user after registration
                return redirect('home')  # Redirect to a home page or dashboard
            except:
                messages.error(request, 'Username already exists.')
        else:
            messages.error(request, 'Passwords do not match.')
    return render(request, 'accounts/signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Redirect to a home page or dashboard
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'accounts/login.html')

@login_required
def get_all_users(request):
    users = User.objects.all().values('id', 'username')
    return JsonResponse(list(users), safe=False)



@login_required
def chat_view(request, recipient_id):
    recipient = get_object_or_404(User, id=recipient_id)
    if request.method == 'POST':
        message = request.POST['message']
        ChatMessage.objects.create(sender=request.user, recipient=recipient, message=message)
    
    messages = ChatMessage.objects.filter(sender=request.user, recipient=recipient) | ChatMessage.objects.filter(sender=recipient, recipient=request.user)
    messages = messages.order_by('timestamp')
    
    return render(request, 'chat.html', {'recipient': recipient, 'messages': messages})