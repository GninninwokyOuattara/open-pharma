from django.shortcuts import render
from openPharma.models import OpenPharmacy, Pharmacy
from openPharma.serializers import (OpenPharmacyDetailsSerializer,
                                    OpenPharmacySerializer, PharmacySerializer)
from rest_framework import viewsets
from rest_framework.response import Response


class PharmacyViewSet(viewsets.ModelViewSet):
    # Define queryset
    queryset = Pharmacy.objects.all()
    # Define serializer class
    serializer_class = PharmacySerializer


class OpenPharmaciesView(viewsets.ModelViewSet):

    queryset = OpenPharmacy.objects.all()
    serializer_class = OpenPharmacySerializer
    detail_serializer_class = OpenPharmacyDetailsSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return OpenPharmacySerializer
        return OpenPharmacyDetailsSerializer


class OpenPharmaciesFullView(viewsets.ReadOnlyModelViewSet):

    queryset = OpenPharmacy.objects.all()
    serializer_class = OpenPharmacyDetailsSerializer
