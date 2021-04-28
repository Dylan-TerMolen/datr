"""datr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from .views import logout_user, create_user, get_user_info, check_logged_in,\
generate_new_idea, get_saved_date_locations, save_date_location, delete_date_location

from rest_framework_simplejwt import views as jwt_views
from .social_login_views import social_auth
  
urlpatterns = [
    path('admin/', admin.site.urls),
    # jwt api
    path('api/token/',
         jwt_views.TokenObtainPairView.as_view(),
         name ='token_obtain_pair'),
    path('api/token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name ='token_refresh'),
    # fb auth
    url('', include('social.apps.django_app.urls', namespace='social')),
    path("api/social-auth", social_auth),
    # api
    url('api/logout_user', logout_user),
    url('api/create_user', create_user),
    url('api/get_user_info', get_user_info),
    url('api/save_date_location', save_date_location),
    url('api/delete_date_location', delete_date_location),
    url('api/get_saved_date_locations', get_saved_date_locations),
    url('api/generate_new_idea', generate_new_idea),
    url('api/check_logged_in', check_logged_in)
]
