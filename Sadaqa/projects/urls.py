from django.urls import path
from . import views

urlpatterns = [
    # Template-based views
    path("projects/page/", views.projects_list_page, name="projects-list-page"),
    path(
        "projects/page/<int:pk>/", views.project_detail_page, name="project-detail-page"
    ),
    path("", views.categories_list_page, name="categories-list-page"),
    path(
        "categories/page/<int:pk>/",
        views.category_detail_page,
        name="category-detail-page",
    ),
    # =============================================
    # PROJECT API ENDPOINTS
    # =============================================
    path("api/projects/", views.project_list, name="project-list"),
    path("api/projects/create/", views.project_create, name="project-create"),
    path("api/projects/<int:pk>/", views.project_detail, name="project-detail"),
    path("api/projects/<int:pk>/update/", views.project_update, name="project-update"),
    path("api/projects/<int:pk>/delete/", views.project_delete, name="project-delete"),
    # =============================================
    # CATEGORY API ENDPOINTS
    # =============================================
    path("api/categories/", views.category_list, name="category-list"),
    path("api/categories/create/", views.category_create, name="category-create"),
    path("api/categories/<int:pk>/", views.category_detail, name="category-detail"),
    path(
        "api/categories/<int:pk>/update/", views.category_update, name="category-update"
    ),
    path(
        "api/categories/<int:pk>/delete/", views.category_delete, name="category-delete"
    ),
    # =============================================
    # PROJECT TAG API ENDPOINTS
    # =============================================
    path("api/project-tags/", views.project_tag_list, name="project-tag-list"),
    path(
        "api/project-tags/create/", views.project_tag_create, name="project-tag-create"
    ),
    path(
        "api/project-tags/<int:pk>/",
        views.project_tag_detail,
        name="project-tag-detail",
    ),
    path(
        "api/project-tags/<int:pk>/update/",
        views.project_tag_update,
        name="project-tag-update",
    ),
    path(
        "api/project-tags/<int:pk>/delete/",
        views.project_tag_delete,
        name="project-tag-delete",
    ),
    # =============================================
    # PROJECT PICTURE API ENDPOINTS
    # =============================================
    path("api/project-pics/", views.project_pic_list, name="project-pic-list"),
    path(
        "api/project-pics/create/", views.project_pic_create, name="project-pic-create"
    ),
    path(
        "api/project-pics/<int:pk>/",
        views.project_pic_detail,
        name="project-pic-detail",
    ),
    path(
        "api/project-pics/<int:pk>/update/",
        views.project_pic_update,
        name="project-pic-update",
    ),
    path(
        "api/project-pics/<int:pk>/delete/",
        views.project_pic_delete,
        name="project-pic-delete",
    ),
]
