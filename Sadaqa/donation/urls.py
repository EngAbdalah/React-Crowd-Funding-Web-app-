from django.urls import path
from . import views

urlpatterns = [
    path('donate/', views.create_donation, name='create_donation'),
    path('success/', views.donation_success, name='success'),
    path('history/', views.donation_history, name='history'),

    # REST API endpoints
    path('api/donations/', views.DonationListCreateAPIView.as_view(), name='donation-list-create'),
    path('api/donations/<int:pk>/', views.DonationRetrieveUpdateDestroyAPIView.as_view(), name='donation-detail'),
]
