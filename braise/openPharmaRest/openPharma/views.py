from django.shortcuts import render
from openPharma.models import OpenPharmacy, Pharmacy
from openPharma.serializers import (PharmaciesAdminSerializer,
                                    PharmaciesSerializer)
from rest_framework import status, viewsets
from rest_framework.response import Response


class PharmaciesViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesSerializer


class PharmaciesAdminViewset(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesAdminSerializer
