from rest_framework import serializers
from ..models import CustomUser


# Convert CustomUser model objects into JSON format (for APIs).
# ModelSerializer: Automatically handles model relationships and field validation
class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:  # Meta: Configuration class for the serializer
        model = CustomUser
        # fields: Lists which model fields to include in JSON
        fields = [ 
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "phone",
            "birthdate",
            "pic",
            "country",
        ]

        # a dictionary where you can give special instructions for specific fields.
        # password field, allow it only when someone is sending data 
        # (like registering or updating their password),
        #  but never show it when the API sends back data.”
        extra_kwargs = {"password": {"write_only": True}}

    def validate_phone(self, value):
        if CustomUser.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                "This phone number is already registered."
            )
        return value


# This is used to handle user registration (signing up).
class CustomUserRegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone = serializers.CharField()
    birthdate = serializers.DateField()
    country = serializers.CharField()

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Passwords don't match")
        return data
