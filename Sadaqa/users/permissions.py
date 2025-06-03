from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminForModification(BasePermission):
    """
    - Allow all authenticated users to read and create.
    - Only allow admins to update or delete.
    """

    def has_permission(self, request, view):
        # Allow all authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Admins can do anything
        if request.user.is_staff:
            return True

        # Non-admins:
        if view.action in ["update", "partial_update", "destroy"]:
            return False  # Block modifications
        if view.action == "retrieve":
            return obj.user == request.user  # Owner can see their own report
        return True  # Allow create/list
