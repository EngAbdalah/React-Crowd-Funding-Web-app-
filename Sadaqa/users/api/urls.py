from django.urls import path
from . import views

urlpatterns = [
    path("user/", views.UserDetailAPI.as_view(), name="api-user-detail"),
    path("register/", views.RegisterAPI.as_view(), name="api-register"),
]


# GET	/user/	Returns the authenticated user's details
# PUT	/user/	Fully updates the authenticated user's data
# PATCH	/user/	Partially updates the authenticated user's data

# POST	/register/	Creates a new user if valid
