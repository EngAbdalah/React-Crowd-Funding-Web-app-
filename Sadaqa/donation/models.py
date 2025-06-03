# from django.db import models
# from django.conf import settings
#
# class Donation(models.Model):
#     CURRENCY_CHOICES = [
#         ('EGP', 'Egyptian Pound'),
#         ('USD', 'US Dollar'),
#         ('EUR', 'Euro'),
#     ]
#
#     donor = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name='donations'
#     )
#     project = models.ForeignKey(
#         'projects.Project',
#         on_delete=models.CASCADE,
#         related_name='donations'
#     )
#     amount = models.DecimalField(max_digits=12, decimal_places=2)
#     currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='EGP')
#     donation_date = models.DateTimeField(auto_now_add=True)
#     transaction_id = models.CharField(max_length=100, blank=True, null=True)
#
#     class Meta:
#         ordering = ['-donation_date']
#         verbose_name = 'Donation'
#         verbose_name_plural = 'Donations'
#
#     def __str__(self):
#         return f"#{self.id} - {self.amount} {self.currency} to {self.project.title}"
#
#     def save(self, *args, **kwargs):
#         """Update project's current donations when saving"""
#         super().save(*args, **kwargs)
#         self.project.current_donations += self.amount
#         self.project.save()


from django.db import models
from users.models import CustomUser
from projects.models import Project
from django.conf import settings

class Donation(models.Model):
    CURRENCY_CHOICES = [
        ('EGP', 'Egyptian Pound'),
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
    ]

    donor = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="donations"
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE
    )  
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='EGP')
    donation_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-donation_date']
        verbose_name = 'Donation'
        verbose_name_plural = 'Donations'

    def __str__(self):
        return f"{self.amount} {self.currency} for {self.project.title}"
