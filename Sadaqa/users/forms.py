from django import forms
from allauth.account.forms import SignupForm
from phonenumber_field.formfields import PhoneNumberField
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django_countries.widgets import CountrySelectWidget 
from django_countries.fields import CountryField
from django_countries import countries

# CustomSignupForm is a custom registration form that extends the default Allauth SignupForm
class CustomSignupForm(SignupForm):
    first_name = forms.CharField(max_length=30, label="First Name")
    last_name = forms.CharField(max_length=30, label="Last Name")
    phone = PhoneNumberField(region="EG", label="Phone (Egyptian)")
    pic = forms.ImageField(required=False, label="Profile Picture")

    def clean_phone(self):
        phone = self.cleaned_data["phone"]
        User = get_user_model()
        if User.objects.filter(phone=phone).exists():
            raise ValidationError("This phone number is already registered.")
        return phone
    
# ========================================================================================


User = get_user_model()
class ProfileUpdateForm(forms.ModelForm):
    phone = PhoneNumberField(region="EG", label="Phone (Egyptian)")
    pic = forms.ImageField(required=False, label="Profile Picture")
    birthdate = forms.DateField(
        required=False, widget=forms.DateInput(attrs={"type": "date"})
    )
    facebook_profile = forms.URLField(required=False, label="Facebook Profile")
    country = CountryField().formfield(
        widget=CountrySelectWidget(attrs={"class": "form-control"})
    )
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "phone",
            "pic",
            "birthdate",
            "facebook_profile",
            "country",
        ]

    def clean_phone(self):
        phone = self.cleaned_data.get("phone")
        if User.objects.exclude(pk=self.instance.pk).filter(phone=phone).exists():
            raise ValidationError("This phone number is already in use.")
        return phone

    def clean_facebook_profile(self):
        url = self.cleaned_data.get("facebook_profile")
        if url and "facebook.com" not in url:
            raise ValidationError("Please enter a valid Facebook URL.")
        return url
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'country' in self.fields:
            self.fields['country'].choices = list(countries)
