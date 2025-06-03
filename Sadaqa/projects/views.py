from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import render, get_object_or_404
from .models import Category, Project, ProjectTag, ProjectPic
from .serializers import (
    CategorySerializer,
    ProjectSerializer,
    ProjectTagSerializer,
    ProjectPicSerializer,
    ProjectDetailSerializer
)

@api_view(['GET'])
def project_list(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def project_detail(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectSerializer(project)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def project_create(request):
    serializer = ProjectSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def project_update(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectSerializer(project, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def project_delete(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    project.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# ----------------------
# Template-based views
# ----------------------
def projects_list_page(request):
    projects = Project.objects.all()
    return render(request, 'projects/projects_list.html', {'projects': projects})

def project_detail_page(request, pk):
    project = get_object_or_404(Project, pk=pk)
    return render(request, 'projects/project_detail.html', {'project': project})


# =============================================
# TEMPLATE-BASED VIEWS FOR CATEGORIES
# =============================================

def categories_list_page(request):
    """Template view for categories list"""
    categories = Category.objects.all()
    return render(request, 'projects/categories_list.html', {'categories': categories})


def category_detail_page(request, pk):
    """Template view for category detail"""
    category = get_object_or_404(Category, pk=pk)
    projects = Project.objects.filter(category=category, status='active')
    return render(request, 'projects/category_detail.html', {
        'category': category,
        'projects': projects
    })


# =============================================
# CATEGORY CRUD OPERATIONS
# =============================================

@api_view(['GET'])
def category_list(request):
    """List all categories"""
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def category_create(request):
    """Create a new category"""
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def category_detail(request, pk):
    """Get a specific category"""
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def category_update(request, pk):
    """Update a category"""
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    partial = request.method == 'PATCH'
    serializer = CategorySerializer(category, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def category_delete(request, pk):
    """Delete a category"""
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# =============================================
# PROJECT TAG CRUD OPERATIONS
# =============================================

@api_view(['GET'])
def project_tag_list(request):
    """List all project tags"""
    project_id = request.query_params.get('project_id')
    if project_id:
        tags = ProjectTag.objects.filter(project_id=project_id)
    else:
        tags = ProjectTag.objects.all()
    serializer = ProjectTagSerializer(tags, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_tag_create(request):
    """Create a new project tag"""
    serializer = ProjectTagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def project_tag_detail(request, pk):
    """Get a specific project tag"""
    try:
        tag = ProjectTag.objects.get(pk=pk)
    except ProjectTag.DoesNotExist:
        return Response({'error': 'Project tag not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectTagSerializer(tag)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def project_tag_update(request, pk):
    """Update a project tag"""
    try:
        tag = ProjectTag.objects.get(pk=pk)
    except ProjectTag.DoesNotExist:
        return Response({'error': 'Project tag not found'}, status=status.HTTP_404_NOT_FOUND)

    partial = request.method == 'PATCH'
    serializer = ProjectTagSerializer(tag, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def project_tag_delete(request, pk):
    """Delete a project tag"""
    try:
        tag = ProjectTag.objects.get(pk=pk)
    except ProjectTag.DoesNotExist:
        return Response({'error': 'Project tag not found'}, status=status.HTTP_404_NOT_FOUND)

    tag.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# =============================================
# PROJECT PICTURE CRUD OPERATIONS
# =============================================

@api_view(['GET'])
def project_pic_list(request):
    """List all project pictures"""
    project_id = request.query_params.get('project_id')
    if project_id:
        pics = ProjectPic.objects.filter(project_id=project_id)
    else:
        pics = ProjectPic.objects.all()
    serializer = ProjectPicSerializer(pics, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_pic_create(request):
    """Create a new project picture"""
    serializer = ProjectPicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def project_pic_detail(request, pk):
    """Get a specific project picture"""
    try:
        pic = ProjectPic.objects.get(pk=pk)
    except ProjectPic.DoesNotExist:
        return Response({'error': 'Project picture not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectPicSerializer(pic)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def project_pic_update(request, pk):
    """Update a project picture"""
    try:
        pic = ProjectPic.objects.get(pk=pk)
    except ProjectPic.DoesNotExist:
        return Response({'error': 'Project picture not found'}, status=status.HTTP_404_NOT_FOUND)

    partial = request.method == 'PATCH'
    serializer = ProjectPicSerializer(pic, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def project_pic_delete(request, pk):
    """Delete a project picture"""
    try:
        pic = ProjectPic.objects.get(pk=pk)
    except ProjectPic.DoesNotExist:
        return Response({'error': 'Project picture not found'}, status=status.HTTP_404_NOT_FOUND)

    pic.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
