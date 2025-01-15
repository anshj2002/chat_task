from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('users/', views.get_all_users, name='get_all_users'),
    path('login/', views.login_view, name='login'),
    path('home/', views.home, name='home'),
    path('chat/<int:recipient_id>/', views.chat_view, name='chat_view'),
]
