import base64
from io import BytesIO

from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED
)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from gtts import gTTS

from .models import User, get_countries
from .serializers import (
    CreateUserSerializer,
    ReadUserSerializer
)

@api_view(["POST"])
@permission_classes((AllowAny,))
def create_user(request):
    try:
        data_copy = request.data.copy()
        # validate client is providing the correct sex value
        data_copy["sex"] = User.GENDER_MAPPER.get(data_copy.get("sex"))
        # validate client is providing the correct country value
        data_copy["country"] = get_countries().get(data_copy.get("country"))

        serializer = CreateUserSerializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate jwt token for user to use for authentication
        token_object = RefreshToken.for_user(user)

        response_data = {
            "refresh_token": str(token_object),
            "access_token": str(token_object.access_token),
            "user": ReadUserSerializer(user).data
        }
        return Response(response_data, status=HTTP_201_CREATED)
    except Exception as e:
        return Response(data=e.detail, status=HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes((AllowAny,))
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        validate_email(email)
    except ValidationError as e:
        return Response(e.message, status=HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        assert check_password(password, user.password)
    except (User.DoesNotExist, AssertionError):
        return Response("Invalid or no matching credentials", status=HTTP_404_NOT_FOUND)

    token_object = RefreshToken.for_user(user)
    response_data = {
        "refresh_token": str(token_object),
        "access_token": str(token_object.access_token),
        "user": ReadUserSerializer(user).data
    }

    return Response(response_data, status=HTTP_200_OK)


@api_view(["GET"])
def welcome_user(request):
    # Get the authenticated user
    user = request.user

    # Check if the user is authenticated
    if user.is_authenticated:
        msg = f"Welcome, {user.full_name}!"
    else:
        msg = f"Hello user, you are not authorized to view this page. Please login!"

    # Convert text to speech
    tts = gTTS(text=msg, lang='en')

    # Create an in-memory byte stream
    audio_stream = BytesIO()
    # Write the speech to the byte stream
    tts.write_to_fp(audio_stream)

    # Go back to the start of stream
    audio_stream.seek(0)

    # Convert the audio data to base64 encoding
    audio_data_base64 = base64.b64encode(audio_stream.read()).decode('utf-8')
    return Response({'audio_data_base64': audio_data_base64, "text": msg})
