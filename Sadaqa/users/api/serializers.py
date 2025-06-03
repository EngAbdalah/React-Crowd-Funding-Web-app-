from rest_framework import serializers
from ..models import CustomUser
import phonenumbers
from allauth.account.utils import send_email_confirmation
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "email",
            "first_name",
            "last_name",
            "phone",
            "birthdate",
            "pic",
            "country",
            "facebook_profile",
        ]
        extra_kwargs = {
            "email": {"read_only": True},
        }

    def validate_phone(self, value):
        try:
            phone = phonenumbers.parse(value, "EG")
            if not phonenumbers.is_valid_number(phone):
                raise serializers.ValidationError("Invalid Egyptian phone number")
        except:
            raise serializers.ValidationError("Invalid phone format")

        # Exclude current user during updates
        if self.instance and self.instance.phone == value:
            return value

        if CustomUser.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Phone number already registered")
        return value


class CustomUserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    password2 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "password1",
            "password2",
            "first_name",
            "last_name",
            "phone",
            "pic",
        ]
        extra_kwargs = {
            "password1": {"write_only": True},
            "password2": {"write_only": True},
        }

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_phone(self, value):
        try:
            phone = phonenumbers.parse(value, "EG")
            if not phonenumbers.is_valid_number(phone):
                raise serializers.ValidationError("Invalid Egyptian phone number")
        except:
            raise serializers.ValidationError("Invalid phone format")

        if CustomUser.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Phone number already registered")
        return value

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError({"password2": "Passwords do not match"})

        try:
            validate_password(data["password1"])
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password1": list(e.messages)})

        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password1"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            pic=validated_data.get("pic"),
            is_active=False,  # Require email activation
        )
        send_email_confirmation(self.context["request"], user)
        return user


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "New passwords must match"}
            )

        try:
            validate_password(data["new_password"])
        except DjangoValidationError as e:
            raise serializers.ValidationError({"new_password": list(e.messages)})

        return data


class AccountDeleteSerializer(serializers.Serializer):
    password = serializers.CharField(
        required=True, write_only=True, style={"input_type": "password"}
    )
