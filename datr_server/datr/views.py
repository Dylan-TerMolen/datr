from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db import IntegrityError
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import DatrUser, DateLocation
from .serializers import DatrUserSerializer, DateLocationSerializer
import googlemaps
from .env import GOOGLE_CLOUD_API_KEY
from .utils import parse_api_place

gmaps = googlemaps.Client(key=GOOGLE_CLOUD_API_KEY)

NOT_AUTHED_RESPONSE = JsonResponse({
    "status": "failure",
    "reason": "Not properly authenticated"
})

# Create a new user given a username and password
def create_user(request):
    username = request.GET["username"]
    password = request.GET["password"]
    try:
        newDatrUser = DatrUser.objects.create_user(username=username, password=password)
        return JsonResponse({
            "status": "success",
            "username": username
        })
    except IntegrityError as e:
        print(str(e))
        return JsonResponse({
            "status": "failure",
            "username": username,
            "reason": "Username is already taken"
        })

# Get basic information about the user that is logged in
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
        
    response = JsonResponse({
        "username": request.user.username,
        "status": "success",
        "preferences": request.user.datr_preferences
    })
    return response
        
# Logout a user and invalidate their current JWT
# TODO: Client currently deletes stored token but need to invalidate token server-side
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    username = request.user.username
    if not request.user.is_authenticated:
        return JsonResponse({
            "username": username,
            "status": "failure",
            "reason": f"{username} was never logged in"
        })

    logout(request)
    response = JsonResponse({
        "username": username,
        "status": "success"
    })
    return response
        
    
# Get the saved dating ideas for the user that is currently logged in
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_ideas(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE

    response = gmaps.places(query="adventure")
    places = response["results"]
    
    return JsonResponse({
        "places": [parse_api_place(p) for p in places[:3]],
        "status": "success",
        "username": request.user.username
        })

# Generate new dating ideas for a user based on a set of inputs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_new_user_ideas(request):
    pass


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_date_location(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
    try:
        name = request.GET["name"]
        address = request.GET["address"]
        place_id = request.GET["place_id"]
        photo_reference = request.GET["photo_reference"]
        location = DateLocation(name=name, address=address, place_id=place_id, photo_reference=photo_reference)
        location.save()
        location.user.add(request.user)
        status = "success"
    except Exception as e:
        status = "failed"

    return JsonResponse({"status": status})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_saved_date_locations(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
    
    saved_locations = DateLocation.objects.filter(user=request.user)
    serialized = DateLocationSerializer(saved_locations, many=True)

    return JsonResponse({"data": serialized.data, "status": "success", "username": request.user.username}, safe=False)