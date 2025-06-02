# generics: Pre-built DRF views for common API patterns
# permissions: Tools to control API access (login requirements)
from rest_framework import generics, permissions

# Response: DRF's enhanced HTTP response builder
from rest_framework.response import Response

# HTTP status codes (like 200 OK, 201 Created)
from rest_framework import status

# get_user_model: Safe way to get the project's custom user model
from django.contrib.auth import get_user_model

from .serializers import CustomUserSerializer, CustomUserRegisterSerializer

User = get_user_model()  # to get the correct model dynamically
# know my customuser because of in settings.py has AUTH_USER_MODEL = "users.CustomUser"


# Defines an API endpoint
# that allows retrieving (GET) and updating (PUT/PATCH) a user’s data.
class UserDetailAPI(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Overrides the method that fetches the object to update or retrieve.
    # This ensures that /user/ always refers to the currently authenticated user,
    #  not a specific ID like /user/5/.
    def get_object(self):
        return self.request.user


class RegisterAPI(generics.GenericAPIView):
    serializer_class = CustomUserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(
            email=serializer.validated_data["email"],
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password1"],
            first_name=serializer.validated_data["first_name"],
            last_name=serializer.validated_data["last_name"],
            phone=serializer.validated_data["phone"],
            birthdate=serializer.validated_data["birthdate"],
            country=serializer.validated_data["country"],
        )
        return Response(
            {
                "user": CustomUserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "message": "User Created Successfully. Now perform Login to get your token.",
            },
            status=status.HTTP_201_CREATED,
        )
