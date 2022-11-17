from django.shortcuts import render
from openPharma.models import OpenPharmacy, Pharmacy
from openPharma.serializers import (OpenPharmacyDetailsSerializer,
                                    OpenPharmacySerializer, PharmacySerializer)
from rest_framework import status, viewsets
from rest_framework.response import Response


class PharmacyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer


class OpenPharmaciesView(viewsets.ModelViewSet):
    queryset = OpenPharmacy.objects.all()
    serializer_class = OpenPharmacySerializer
    detail_serializer_class = OpenPharmacyDetailsSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return OpenPharmacySerializer
        return OpenPharmacyDetailsSerializer


class OpenPharmaciesAdminView(viewsets.ModelViewSet):
    queryset = OpenPharmacy.objects.all()
    serializer_class = OpenPharmacySerializer
    detail_serializer_class = OpenPharmacyDetailsSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return OpenPharmacySerializer
        return OpenPharmacyDetailsSerializer

    def list(self, request, *args, **kwargs):

        # queryset = self.filter_queryset(self.get_queryset())
        # serializer = self.get_serializer(queryset, many=True)
        # Get all open pharmacies
        open_pharmacies = OpenPharmacy.objects.all()
        # serializer = OpenPharmacyDetailsSerializer(open_pharmacies, many=True)
        serializer = self.get_serializer(open_pharmacies, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class OpenPharmaciesFullView(viewsets.ReadOnlyModelViewSet):
    queryset = OpenPharmacy.objects.all()
    serializer_class = OpenPharmacyDetailsSerializer
