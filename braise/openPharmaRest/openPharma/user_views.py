
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from openPharma.users_serializers import (UserPharmaciesSerializer,
                                          UsersPharmacieDetailsSerializer)
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from django.utils.timezone import now

# import pharmacy model
from .models import OpenPharmacy, Pharmacy


class UsersPharmaciesViewset(ReadOnlyModelViewSet):
    serializer_class = UserPharmaciesSerializer
    queryset = Pharmacy.objects.filter(
        active=True,
        pending_review=False
    )

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UsersPharmacieDetailsSerializer
        return UserPharmaciesSerializer

    @method_decorator(cache_page(60*30))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class UserPharmaciesTrackingInformationsSummary(ReadOnlyModelViewSet):
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        current_date = now()

        active_pharmacies_count = Pharmacy.objects.filter(active=True).count()
        open_pharmacies_count = OpenPharmacy.objects.filter(
            open_from__lte=current_date, open_until__gte=current_date).count()

        data = {
            "active_pharmacies": active_pharmacies_count,
            "open_pharmacies": open_pharmacies_count
        }

        return Response(data)
