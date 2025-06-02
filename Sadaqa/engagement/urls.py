from django.urls import path
from .views import *

urlpatterns = [
    path('comments/', comment_list),
    path('comments/<int:pk>/', comment_detail),
    path('replies/', reply_list),
    path('replies/<int:pk>/', reply_detail),
    path('rates/', rate_list),
    path('rates/<int:pk>/', rate_detail),
]