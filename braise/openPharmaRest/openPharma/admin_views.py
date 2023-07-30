
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from openPharma.admin_serializers import (PharmacieDetailsSerializer,
                                          PharmaciesSerializer)
from openPharma.models import Pharmacy
from rest_framework.decorators import action
from rest_framework.response import Response

from openPharmaRest.authorization import ModelViewSetWithAuthorization
from openPharmaRest.panigation import ResultsSetPagination


class PharmaciesAsAdminViewset(ModelViewSetWithAuthorization, ResultsSetPagination):
    queryset = Pharmacy.objects.all()
    # serializer_class = PharmaciesSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacieDetailsSerializer
        elif self.request.method == "PUT":
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

    @action(detail=True, methods=['post'])
    def activate(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.active = True
            instance.save()
            serializer = self.get_serializer(instance)

            message = f"{instance.name} has been activated succesfully"
            data = serializer.data
            return Response({"message": message, "data": data}, status=200)
        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)

    @action(detail=True, methods=['post'])
    def deactivate(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.active = False
            instance.save()
            serializer = self.get_serializer(instance)

            message = f"{instance.name} has been deactivated."
            data = serializer.data
            return Response({"message": message, "data": data}, status=200)
        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)
