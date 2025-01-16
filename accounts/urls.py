from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile_view, name='profile'),
    path('support/', views.support_view, name='support'),
    path('chat/<int:recipient_id>/', views.chat_view, name='chat'),
    path('logout/', views.logout_view, name='logout'),
     path('users/', views.user_list_view, name='user_list'),
]
