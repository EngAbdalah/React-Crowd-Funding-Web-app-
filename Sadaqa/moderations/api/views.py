from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.db import IntegrityError
from ..models import Report
from .serializers import ReportSerializer
from users.permissions import IsAdminForModification

from rest_framework.exceptions import PermissionDenied


class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [IsAdminForModification]

    def get_queryset(self):
        queryset = Report.objects.select_related("user", "comment")
        if not self.request.user.is_staff:
            queryset = queryset.filter(user=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {"error": "You already reported this comment"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            self.permission_denied(self.request)
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff:
            self.permission_denied(self.request)
        instance.delete()

    def permission_denied(self, request, message=None, code=None):
        raise PermissionDenied(detail="Only admins can update or delete reports.")
