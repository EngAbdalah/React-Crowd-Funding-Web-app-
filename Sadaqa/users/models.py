from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField
from django.contrib.auth.base_user import BaseUserManager


# needed to create account without username required
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


# Create your models here.
class CustomUser(AbstractUser):
    # fields inherited from AbstractUser by defualt are
    # password
    # first_name
    # last_name
    username = None
    email = models.EmailField(unique=True, blank=False)
    phone = PhoneNumberField(unique=True)
    birthdate = models.DateField(null=True, blank=True)
    pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
    country = CountryField(default="EG", blank=True)
    facebook_profile = models.URLField(
        blank=True, 
        null=True,
        verbose_name="Facebook Profile"
    )

    USERNAME_FIELD = 'email'  # Use EMAIL as login ID
    REQUIRED_FIELDS = []  # Remove default requirements

    objects = CustomUserManager()

    def __str__(self):
        return self.email
