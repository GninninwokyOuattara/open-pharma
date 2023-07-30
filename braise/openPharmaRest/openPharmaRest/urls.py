"""openPharmaRest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from rest_framework_swagger.views import get_swagger_view

from openPharmaRest.routers import AdminRouter, UserRouter

user_router = UserRouter().get_router()
admin_router = AdminRouter().get_router()

schema_view = get_swagger_view(title='OpenPharma API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(user_router.urls)),
    path("admin-api/", include(admin_router.urls)),

    path("docs/", schema_view),
    path('admin-api/auth/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('admin-api/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),

]
