from rest_framework import serializers
from .models import Comment, Reply, Rate
from users.api.serializers import CustomUserSerializer
from projects.serializers import ProjectSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('created_at',)


class ReplySerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)

    class Meta:
        model = Reply
        fields = '__all__'
        read_only_fields = ('created_at',)


class RateSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Rate
        fields = '__all__'
        read_only_fields = ('created_at',)
