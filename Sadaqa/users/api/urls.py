# urls.py
from django.urls import path
from .views import (
    UserDetailAPI,
    RegisterAPI,
    ChangePasswordAPI,
    DeleteAccountAPI,
    PasswordResetAPI,
)

urlpatterns = [
    path("user/", UserDetailAPI.as_view(), name="user-detail"),
    path("register/", RegisterAPI.as_view(), name="register"),
    path("change-password/", ChangePasswordAPI.as_view(), name="change-password"),
    path("delete-account/", DeleteAccountAPI.as_view(), name="delete-account"),
    path("password-reset/", PasswordResetAPI.as_view(), name="password-reset"),
]
