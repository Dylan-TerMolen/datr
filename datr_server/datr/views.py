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
from .new_date import generate_ideas


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
        

# Generate new dating ideas for a user based on a set of inputs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_new_idea(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
    try:
        preferences = request.GET["preferences"].split(",")
        moods = request.GET["moods"].split(",")
    except Exception as e:
        return JsonResponse({
            "status": "error",
            "reason": "missing parameters"
        })


    places = generate_ideas(preferences, moods)

    return JsonResponse({
        "places": places,
        "status": "success",
        "username": request.user.username
    })


# Save a date idea for a user given the necessary information about that date
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
        photo_string = request.GET["photo_string"]
        location = DateLocation(name=name, address=address, place_id=place_id, photo_reference=photo_reference, photo_string=photo_string)
        if len(DateLocation.objects.filter(place_id=place_id)) == 0:
            location.save()
            location.user.add(request.user)
            status = "success"
        else:
            status = "existed"

    except Exception as e:
        status = "failed"

    return JsonResponse({"status": status})

# Delete a date idea for a user given the place_id
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_date_location(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
    try:
        place_id = request.GET["place_id"]
        print(DateLocation.objects.filter(place_id=place_id, user=request.user).delete())
        status = "success"

    except Exception as e:
        status = "failed"

    return JsonResponse({"status": status})


# Get the saved date locations for a user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_saved_date_locations(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
    
    saved_locations = DateLocation.objects.filter(user=request.user)
    serialized = DateLocationSerializer(saved_locations, many=True)

    return JsonResponse({"data": serialized.data, "status": "success", "username": request.user.username}, safe=False)

# Route for the client to get username for token
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_logged_in(request):
    if not request.user.is_authenticated:
        return NOT_AUTHED_RESPONSE
    
    return JsonResponse({"status": "success", "username": request.user.username})