from django.urls import path, include
from django.conf import settings
urlpatterns = [
    
    path('api/', include('moderations.api.urls')),
]