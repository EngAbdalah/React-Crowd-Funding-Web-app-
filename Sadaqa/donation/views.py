from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import DonationForm
from .models import Donation
from django.contrib import messages

# REST framework imports
from rest_framework import generics, permissions
from .serializers import DonationSerializer

# -------------------- Web Views --------------------

@login_required
def create_donation(request):
    if request.method == 'POST':
        form = DonationForm(request.POST)
        if form.is_valid():
            donation = form.save(commit=False)
            donation.donor = request.user
            donation.save()
            messages.success(request, "Donation submitted successfully!")
            return redirect('donation:success')
    else:
        form = DonationForm()

    return render(request, 'donation/donate.html', {'form': form})


@login_required
def donation_success(request):
    return render(request, 'donation/success.html')


@login_required
def donation_history(request):
    donations = Donation.objects.filter(donor=request.user).order_by('-donation_date')
    return render(request, 'donation/history.html', {'donations': donations})


# -------------------- REST API Views --------------------

class DonationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(donor=self.request.user)


class DonationRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(donor=self.request.user)
