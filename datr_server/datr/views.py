from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db import IntegrityError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import DatrUser
from .serializers import DatrUserSerializer


@api_view(['GET'])
def post_collection(request):
    if request.method == 'GET':
        users = DatrUser.objects.all()
        serializer = DatrUserSerializer(users, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def post_element(request, pk):
    try:
        datrUser = DatrUser.objects.get(pk=pk)
    except DatrUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DatrUserSerializer(datrUser)
        return Response(serializer.data)

def login_user(request):
    username = request.GET["username"]
    password = request.GET["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # User successfully authenticated
        payload = JWT_PAYLOAD_HANDLER(user)
        jwt_token = JWT_ENCODE_HANDLER(payload)

        return JsonResponse({
            "status": "success",
            "username": username,
            "token": jwt_token
        })
    else:
        # User did not successfully authenticate
        return JsonResponse({
            "status": "failure",
            "username": username,
            "reason": "Username and password did not match"
        })


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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    if request.user.is_authenticated:
        response = JsonResponse({
            "username": request.user.username,
            "status": "success",
            "preferences": request.user.datr_preferences
        })
        return response
    else:
        return JsonResponse({
            "status": "failure",
            "reason": "Not properly authenticated"
        })
        
def logout_user(request):
    username = request.user.username
    if request.user.is_authenticated:
        logout(request)
        response = JsonResponse({
            "username": username,
            "status": "success"
        })
        return response
    else:
        return JsonResponse({
            "username": username,
            "status": "failure",
            "reason": f"{username} was never logged in"
        })
    