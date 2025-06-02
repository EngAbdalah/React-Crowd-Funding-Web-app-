from django.db import models
from users.models import CustomUser
from engagement.models import Comment


# Create your models here.
class Report(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=10,
        choices=[
            ("pending", "Pending"),
            ("reviewed", "Reviewed"),
            ("dismissed", "Dismissed"),
        ],
        default="pending",
    )
    is_reviewed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} reported comment {self.comment.id}"

    # Django creates a UNIQUE CONSTRAINT in the actual database table.
    # So the database blocks any attempt to insert duplicate combinations of (user, comment).
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "comment"], name="unique_user_comment_report"
            )
        ]
