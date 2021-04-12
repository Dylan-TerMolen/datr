from django.db import models
from django.contrib.auth.models import AbstractUser

class DatrUser(AbstractUser):
    datr_preferences = models.FloatField(default=0.5)
    
    def __str__(self):
        return f"{self.username}"