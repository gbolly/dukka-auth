from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def validate_password(self, plain_password):
        validate_password(plain_password)
        return make_password(plain_password)


class ReadUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]
