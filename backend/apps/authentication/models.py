from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from .manager import UserManager


class User(AbstractBaseUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    sex = models.CharField(max_length=10, blank=True, null=True)
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email
