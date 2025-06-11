# urls.py
from django.urls import path, include
from .views import (
    UserDetailAPI,
    RegisterAPI,
    ChangePasswordAPI,
    DeleteAccountAPI,
    PasswordResetAPI,
)
from dj_rest_auth.views import PasswordResetConfirmView


urlpatterns = [
    path("user/", UserDetailAPI.as_view(), name="user-detail"),
    path("register/", RegisterAPI.as_view(), name="register"),
    path("change-password/", ChangePasswordAPI.as_view(), name="change-password"),
    path("delete-account/", DeleteAccountAPI.as_view(), name="delete-account"),
    path("password-reset/", PasswordResetAPI.as_view(), name="password-reset"),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path(
        "dj-rest-auth/password/reset/confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
]
