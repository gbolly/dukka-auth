from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.create_user, name="user-signup"),
    path('login/', views.login_user, name="user-login"),
    path('welcome/', views.welcome_user, name="user-welcome"),
]
