from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from .manager import UserManager


# Function to retrieve countries from settings
def get_countries():
    return {i: i for i in settings.COUNTRIES}


# Custom user model
class User(AbstractBaseUser):
    # Choices for gender field
    GENDER_CHOICES = (
        ('M', 'male'),
        ('F', 'female'),
        ('O', 'other'),
    )
    # Mapper for gender choices
    GENDER_MAPPER = {v: k for k, v in GENDER_CHOICES}

    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    sex = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=15, unique=True)
    country = models.CharField(max_length=100, choices=get_countries)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    # Field used for authentication
    USERNAME_FIELD = 'email'
    # Additional required fields
    REQUIRED_FIELDS = ['full_name']

    def has_module_perms(self, app_label):
        return self.is_staff

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def __str__(self):
        return self.email
