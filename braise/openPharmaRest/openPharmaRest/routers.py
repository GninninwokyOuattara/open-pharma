from abc import ABC, abstractmethod

# from openTracker.views import OpenPharmaTrackerHistoryViewset
from rest_framework import routers
from rest_framework.routers import SimpleRouter

from openPharma.admin_dashboard_views import (OpenPharmaActivityViewset,
                                              PharmaciesAllStatesCountView,
                                              PharmaciesOverWeeksCountViews,
                                              PharmaciesReviewsStatesCountView,
                                              PharmaciesStatesCountView)
from openPharma.admin_views import (PharmaciesActualizerView,
                                    PharmaciesAsAdminViewset,
                                    PharmaciesPendingReviewAsAdminViewset,
                                    PharmaciesZoneAsAdminViewset,
                                    SearchApiView)
from openPharma.user_views import UsersPharmaciesViewset


class RouterGenerator(ABC):

    @abstractmethod
    def get_router(self) -> SimpleRouter:
        pass


class UserRouter(RouterGenerator):

    router = routers.SimpleRouter()
    router.register(r"pharmacies", UsersPharmaciesViewset,
                    basename="pharmacies")

    def get_router(self):
        return self.router


class AdminRouter(RouterGenerator):

    router = routers.SimpleRouter()
    router.register(
        r"pharmacies", PharmaciesAsAdminViewset, basename="pharmacies")
    router.register(r'pharmacies-pending-review',
                    PharmaciesPendingReviewAsAdminViewset, basename='admin-pharmacies-pending-review')
    router.register(r"get-zones", PharmaciesZoneAsAdminViewset)

    router.register(
        r"dashboard/get-recent-activity", OpenPharmaActivityViewset, basename="dashboard/get-recent-activity"
    )

    router.register(r"dashboard/pharmacies-count-over-weeks",
                    PharmaciesOverWeeksCountViews, basename="pharmacies-count-over-weeks")

    router.register(r"dashboard/pharmacies-states-count",
                    PharmaciesStatesCountView, basename="pharmacies-states-count")

    router.register(r"dashboard/pharmacies-reviews-states-count",
                    PharmaciesReviewsStatesCountView, basename="pharmacies-reviews-states-count")
    router.register(r"dashboard/pharmacies-states",
                    PharmaciesAllStatesCountView, basename="pharmacies-states")
    # router.register(
    #     r"dashboard/get-latest-tracker-results", OpenPharmaTrackerHistoryViewset, basename="dashboard/get-latest-tracker-results"
    # )

    # Utils

    router.register(r"actualizer", PharmaciesActualizerView,
                    basename="actualizer")
    router.register(r"search-coordinates", SearchApiView,
                    basename="search-coordinates")

    def get_router(self):
        return self.router
