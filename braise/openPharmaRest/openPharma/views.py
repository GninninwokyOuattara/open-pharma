from django.shortcuts import render
from openPharma.models import Pharmacy
from openPharma.serializers import PharmacySerializer
# Import ModelViewSet
from rest_framework import viewsets


class PharmacyViewSet(viewsets.ModelViewSet):
    # Define queryset
    queryset = Pharmacy.objects.all()
    # Define serializer class
    serializer_class = PharmacySerializer
