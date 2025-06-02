from rest_framework import serializers
from ..models import Report
from users.models import CustomUser
from engagement.models import Comment
from django.utils import timezone


class ReportSerializer(serializers.ModelSerializer):

    # 🤫 Secret User Tracking: Automatically records who made the report
    # 🔒 No Spoofing: Users can't fake someone else's identity
    # 👤 Auto-Fill: Uses the logged-in user (you don't send this)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    # 🔍 Comment Checker: Verifies the reported comment actually exists
    # ❌ Clear Error: Shows "Comment does not exist" if invalid
    # #️⃣ Only ID Needed: You just send the comment's ID number
    comment = serializers.PrimaryKeyRelatedField(
        queryset=Comment.objects.all(),
        error_messages={"does_not_exist": "Comment does not exist"},
    )

    class Meta:
        model = Report
        fields = [
            "id",
            "user",
            "comment",
            "reason",
            "status",
            "created_at",
            "is_reviewed",
        ]

        # 🔐 Locked Fields: These are controlled by the system:
        # status: Always starts as "pending"
        # created_at: Automatic timestamp
        # is_reviewed: Starts as False (unreviewed)
        read_only_fields = ["status", "created_at", "is_reviewed"]

        # 🚫 No Empty Complaints: Must provide a reason
        extra_kwargs = {
            "reason": {
                "required": True,
                "allow_blank": False,
                "error_messages": {"blank": "Reason cannot be empty"},
            }
        }

    # ⚠️ Anti-Spam Protection: Blocks duplicate reports (same user + same comment)
    # ⏰ Automatic Time Log: Records when report was made
    # 🔍 Behind-the-Scenes: Runs before saving any data
    def validate(self, attrs):

        user = attrs.get("user")
        comment = attrs.get("comment")

        if Report.objects.filter(user=user, comment=comment).exists():
            raise serializers.ValidationError(
                {"comment": "You have already reported this comment"}
            )

        #
        # During validation (occuring above ⬆️⬆️⬆️)
        # → created_at doesn't exist yet → it's None (NULL)
        # Makes timestamp available early
        attrs.setdefault("created_at", timezone.now())

        return attrs

    # 🟡 Status Enforcement: New reports always start as "pending"
    # 🛡️ Security Guarantee: Ignores any status user tries to send
    # 📥 Final Save: Puts everything in the database
    def create(self, validated_data):
        validated_data["status"] = "pending"
        return super().create(validated_data)
