# from django import forms
# from .models import Donation
#
#
# class DonationForm(forms.ModelForm):
#     class Meta:
#         model = Donation
#         fields = ['amount', 'currency']
#         widgets = {
#             'amount': forms.NumberInput(attrs={
#                 'class': 'form-control',
#                 'min': '1',
#                 'step': '0.01',
#                 'placeholder': 'Enter amount'
#             }),
#             'currency': forms.Select(attrs={
#                 'class': 'form-select'
#             })
#         }
#
#     def clean_amount(self):
#         amount = self.cleaned_data.get('amount')
#         if amount <= 0:
#             raise forms.ValidationError("Donation amount must be positive")
#         return amount


from django import forms
from .models import Donation

class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = ['project', 'amount', 'currency']
        widgets = {
            'project_title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter project name'
            }),
            'amount': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '1',
                'step': '0.01'
            }),
            'currency': forms.Select(attrs={
                'class': 'form-select'
            })
        }