from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import profile_update_view, DeleteAccountView

urlpatterns = [
    path("", include("allauth.urls")),
    path("social/", include("allauth.socialaccount.urls")),
    path("api/", include("users.api.urls")),
    path("profile/", profile_update_view, name="update"),
    path("delete-account/", DeleteAccountView.as_view(), name="delete_account"),
]
# Serve media files during development only
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
