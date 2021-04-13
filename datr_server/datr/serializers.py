from rest_framework import serializers
from .models import DatrUser, DateLocation


class DatrUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatrUser
        fields = ("username", "datr_preferences")

class DateLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateLocation
        fields = ("photo_reference", "name", "address", "place_id")