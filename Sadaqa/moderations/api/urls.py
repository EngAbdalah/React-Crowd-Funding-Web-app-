from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet

router = DefaultRouter()
router.register(r"reports", ReportViewSet, basename="report")

urlpatterns = router.urls

# /api/reports/	GET	List all reports (user-scoped)	All authenticated users
# /api/reports/	POST	Create new report	All authenticated users
# /api/reports/{id}/	GET	Get report details	Report owner or admin
# /api/reports/{id}/	PUT	Full report update	Admins only
# /api/reports/{id}/	PATCH	Partial report update	Admins only
# /api/reports/{id}/	DELETE	Delete report	Admins only
