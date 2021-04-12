from rest_framework import serializers
from .models import DatrUser


class DatrUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatrUser
        fields = ("username", "datr_preferences")