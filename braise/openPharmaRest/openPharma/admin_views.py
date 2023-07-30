
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from openPharma.admin_serializers import (PharmacieDetailsSerializer,
                                          PharmaciesSerializer)
from openPharma.models import Pharmacy

from openPharmaRest.authorization import ModelViewSetWithAuthorization
from openPharmaRest.panigation import ResultsSetPagination


class PharmaciesAsAdminViewset(ModelViewSetWithAuthorization, ResultsSetPagination):
    queryset = Pharmacy.objects.all()
    # serializer_class = PharmaciesSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacieDetailsSerializer
        return PharmaciesSerializer

    def list(self, request, *args, **kwargs):

        name = request.query_params.get("name") or ""
        zone = request.query_params.get("zone") or ""

        queryset = Pharmacy.objects.filter(
            name__icontains=name,
            # zone__icontains=zone,
            active=True,
            pending_review=False
        )
        page = self.paginate_queryset(queryset, request)
        serializer = PharmaciesSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)
