# engagement/serializers.py
from rest_framework import serializers
from .models import Comment, Reply, Rate
from users.api.serializers import CustomUserSerializer
from projects.serializers import ProjectSerializer
from projects.models import Project


class CommentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    # Add writeable project_id field
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(), source="project", write_only=True
    )

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("created_at", "user", "project")


class ReplySerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    # Add writeable comment_id field
    comment_id = serializers.PrimaryKeyRelatedField(
        queryset=Comment.objects.all(), source="comment", write_only=True
    )

    class Meta:
        model = Reply
        fields = "__all__"
        read_only_fields = ("created_at", "user", "comment")


class RateSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    # Add writeable project_id field
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(), source="project", write_only=True
    )

    class Meta:
        model = Rate
        fields = "__all__"
        read_only_fields = ("created_at", "user", "project")
