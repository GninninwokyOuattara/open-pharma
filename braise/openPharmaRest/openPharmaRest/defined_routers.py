from abc import ABC, abstractmethod

from openPharma.admin_dashboard_views import (PharmaciesOverWeeksCountViews,
                                              PharmaciesReviewsStatesCountView,
                                              PharmaciesStatesCountView)
from openPharma.admin_views import (PharmaciesActualizerViewset,
                                    PharmaciesAsAdminViewset,
                                    PharmaciesPendingReviewAsAdminViewset)
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
                              PharmaciesStatisticsViewset, PharmaciesViewset)
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
    router.register(r"pharmacies", UsersPharmaciesViewset,
                    basename="pharmacies-states")

    def get_router(self):
        return self.router


class AdminRouter(RouterGenerator):

    router = routers.SimpleRouter()
    router.register(
        r"pharmacies", PharmaciesAsAdminViewset, basename="pharmacies")
    router.register("active-pharmacies-states",
                    OpenPharmaPharmaciesStatesAdminViewSet, basename="active-pharmacies-states")
    router.register(r'pharmacies-pending-review',
                    PharmaciesPendingReviewAsAdminViewset, basename='admin-pharmacies-pending-review')

    router.register(r"actualizer", PharmaciesActualizerViewset,
                    basename="actualizer")

    router.register(
        r"dashboard/get-recent-activity", OpenPharmaActivityViewset, basename="dashboard/get-recent-activity"
    )

    router.register(r"dashboard/pharmacies-count-over-weeks",
                    PharmaciesOverWeeksCountViews, basename="pharmacies-count-over-weeks")

    router.register(r"dashboard/pharmacies-states-count",
                    PharmaciesStatesCountView, basename="pharmacies-states-count")

    router.register(r"dashboard/pharmacies-reviews-states-count",
                    PharmaciesReviewsStatesCountView, basename="pharmacies-reviews-states-count")

    router.register(
        r"dashboard/get-latest-tracker-results", OpenPharmaTrackerHistoryViewset, basename="dashboard/get-latest-tracker-results"
    )

    def get_router(self):
        return self.router
