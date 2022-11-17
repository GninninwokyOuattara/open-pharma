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
from openPharma.views import (OpenPharmaciesAdminView, OpenPharmaciesFullView,
                              OpenPharmaciesView, PharmacyViewSet)
from openPharmaRest.views import TestView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'pharmacies', PharmacyViewSet, basename='pharmacies')
router.register(r"open", OpenPharmaciesView, basename="open")
router.register(r"open_pharmacies", OpenPharmaciesFullView,
                basename="open_pharmacy_full")

adminRouter = routers.SimpleRouter()
adminRouter.register(r"open_pharmacies",
                     OpenPharmaciesAdminView, basename="pharmacies")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("test/", TestView.as_view()),
    path('api/', include(router.urls)),
    path('api/admin/', include(adminRouter.urls))
]