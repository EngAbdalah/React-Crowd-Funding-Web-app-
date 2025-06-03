from allauth.account.adapter import DefaultAccountAdapter
from .forms import CustomSignupForm


# tells Allauth to use my custom form instead of the default one during registration.
class CustomAccountAdapter(DefaultAccountAdapter):

    # This tells Allauth to use your own CustomSignupForm instead of
    #  the default form when users register.
    def get_signup_form_class(self, request):
        return CustomSignupForm

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, False)
        user.first_name = form.cleaned_data.get("first_name")
        user.last_name = form.cleaned_data.get("last_name")
        user.phone = form.cleaned_data.get("phone")
        user.pic = form.cleaned_data.get("pic")
        if commit:
            user.save()
        return user
