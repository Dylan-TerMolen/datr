from django.db import models
from django.contrib.auth.models import AbstractUser

class DatrUser(AbstractUser):
    datr_preferences = models.FloatField(default=0.5)
    
    def __str__(self):
        return f"{self.username}"

class DateLocation(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    place_id = models.CharField(max_length=30)
    photo_reference = models.CharField(max_length=200)
    user = models.ManyToManyField(DatrUser)
    photo_string = models.CharField(max_length=50000, blank=True, null=True)

    def __str__(self):
        return f"{self.name} is located at {self.address}"