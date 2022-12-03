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
# import SearchApiView
from googleMapsScrapper.views import SearchApiView
from openPharma.views import (OpenPharmaciesAdminViewset,
                              OpenPharmaciesViewset, PharmaciesAdminViewset,
                              PharmaciesCurrentStateViewset,
                              PharmaciesPendingReviewAdminViewset,
                              PharmaciesViewset)
from openTracker.views import CurrentlyOpenPharmaciesView
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from openPharmaRest.views import TestView

user_router = routers.SimpleRouter()
user_router.register(r'pharmacies', PharmaciesViewset, basename='pharmacies')
user_router.register(r'open-pharmacies',
                     OpenPharmaciesViewset, basename='open-pharmacies')
user_router.register(r"pharmacies-current-state",
                     PharmaciesCurrentStateViewset, basename="pharmacies-current-state")


admin_router = routers.SimpleRouter()
admin_router.register(
    r"pharmacies", PharmaciesAdminViewset, basename="admin-pharmacies")
admin_router.register(r'pharmacies-pending-review',
                      PharmaciesPendingReviewAdminViewset, basename='admin-pharmacies-pending-review')

admin_router.register(r"open-pharmacies",
                      OpenPharmaciesAdminViewset, basename="admin-open-pharmacies")


schema_view = get_swagger_view(title='OpenPharma API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(user_router.urls)),
    path("admin-api/", include(admin_router.urls)),
    path("admin-api/get-currently-open-pharmacies/",
         CurrentlyOpenPharmaciesView.as_view(), name="tracker"),
    path("search/",
         SearchApiView.as_view(), name="search"),

    path("docs/", schema_view),

]
