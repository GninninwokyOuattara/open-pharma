from abc import ABC, abstractmethod

from openPharma.user_views import UsersPharmaciesViewset
from openPharma.views import (OpenPharmaActivityViewset,
                              OpenPharmaciesAdminViewset,
                              OpenPharmaciesViewset,
                              OpenPharmaPharmaciesStatesAdminViewSet,
                              PharmaciesAdminViewset,
                              PharmaciesAllStateCountView,
                              PharmaciesCurrentStateViewset,
                              PharmaciesPendingReviewAdminViewset,
                              PharmaciesStateAndCountViewset,
                              PharmaciesViewset)
from openTracker.views import OpenPharmaTrackerHistoryViewset
from rest_framework import routers
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt import views as jwt_views


class RouterGenerator(ABC):

    @abstractmethod
    def get_router(self) -> SimpleRouter:
        pass


class UserRouter(RouterGenerator):

    router = routers.SimpleRouter()
    router.register("pharmacies-states", UsersPharmaciesViewset,
                    basename="pharmacies-states")
    router.register(
        r"pharmacies", PharmaciesViewset, basename="pharmacies")
    router.register(r'open-pharmacies',
                    OpenPharmaciesViewset, basename='open-pharmacies')
    router.register(r"pharmacies-current-state",
                    PharmaciesCurrentStateViewset, basename="pharmacies-current-state")

    def get_router(self):
        return self.router


class AdminRouter(RouterGenerator):

    router = routers.SimpleRouter()
    router.register(
        r"pharmacies", PharmaciesAdminViewset, basename="pharmacies")
    router.register("active-pharmacies-states",
                    OpenPharmaPharmaciesStatesAdminViewSet, basename="active-pharmacies-states")
    router.register(r'pharmacies-pending-review',
                    PharmaciesPendingReviewAdminViewset, basename='admin-pharmacies-pending-review')

    router.register(r"open-pharmacies",
                    OpenPharmaciesAdminViewset, basename="admin-open-pharmacies")
    router.register(r"get-pharmacies-states-count",
                    PharmaciesAllStateCountView, basename="get-pharmacies-states-count")
    router.register(r"get-pharmacies-state-and-count",
                    PharmaciesStateAndCountViewset, basename="get-pharmacies-state-and-count")

    router.register(
        r"dashboard/get-recent-activity", OpenPharmaActivityViewset, basename="dashboard/get-recent-activity"
    )

    router.register(
        r"dashboard/get-latest-tracker-results", OpenPharmaTrackerHistoryViewset, basename="dashboard/get-latest-tracker-results"
    )

    def get_router(self):
        return self.router
