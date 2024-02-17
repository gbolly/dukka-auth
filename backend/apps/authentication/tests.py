from django.urls import reverse

from rest_framework.test import APITestCase

from .models import User


class UserSignupTests(APITestCase):
    def setUp(self):
        self.user_data_sample = {
            "full_name": "Test User",
            "email": "test@user.com",
            "phone_number": "09083848394",
            "password": "tu_password",
            "sex": "male",
            "country": "Canada"
        }
        self.url = reverse("user-signup")

    def test_user_signup_ok(self):
        response = self.client.post(
            self.url, self.user_data_sample, format="json"
        )
        self.assertEqual(response.status_code, 201)

        response_data = response.data
        self.assertIsNotNone(response_data["access_token"])
        self.assertIsNotNone(response_data["user"])

    def test_user_signup_existing_email_returns_error(self):
        self.client.post(
            self.url, self.user_data_sample, format="json"
        )
        response = self.client.post(
            self.url, self.user_data_sample, format="json"
        )
        self.assertEqual(response.status_code, 400)


class UserLoginTests(APITestCase):
    def setUp(self):
        self.user_data_sample = {
            "email": "test@user.com",
            "password": "tu_password"
        }
        self.url = reverse("user-login")
        self.user = User.objects.create_user(email="test@user.com",
                                             password="tu_password",
                                             full_name="Test User",
                                             phone_number="09083848394",
                                             sex="male",
                                             country="Canada")

    def test_user_login_ok(self):
        response = self.client.post(self.url, self.user_data_sample, format="json")

        self.assertEqual(response.status_code, 200)
        response_data = response.data
        self.assertIsNotNone(response_data["access_token"])
        self.assertIsNotNone(response_data["user"])
        self.assertEqual(response_data["user"]["email"], self.user_data_sample["email"])

    def test_user_login_incorrect_password_returns_error(self):
        response = self.client.post(
            self.url,
            {"email": self.user_data_sample["email"], "password": "a1b2c3"},
            format="json"
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data, "Invalid or no matching credentials")

    def test_user_login_nonexisting_email_returns_error(self):
        response = self.client.post(
            self.url,
            {"email": "random@sample.com",
             "password": self.user_data_sample["password"]},
            format="json"
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data, "Invalid or no matching credentials")
