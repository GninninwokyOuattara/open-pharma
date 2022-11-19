import datetime

from django.shortcuts import render
from openPharma.models import OpenPharmacy, Pharmacy
from openPharma.serializers import (OpenPharmaciesAdminSerializer,
                                    OpenPharmaciesListAdminSerializer,
                                    PharmaciesAdminSerializer,
                                    PharmaciesOpenStateSerializer,
                                    PharmaciesPendingReviewAdminSerializer,
                                    PharmaciesSerializer)
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class PharmaciesViewset(viewsets.ReadOnlyModelViewSet):
    # queryset = Pharmacy.objects.all()
    # Get active pharmacies
    queryset = Pharmacy.objects.filter(active=True, pending_review=False)
    serializer_class = PharmaciesSerializer


class PharmaciesAdminViewset(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesAdminSerializer

    def get_queryset(self):

        return super().get_queryset()

    @action(detail=True, methods=['post'])
    def desactivate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class PharmaciesPendingReviewAdminViewset(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.filter(pending_review=True)
    serializer_class = PharmaciesPendingReviewAdminSerializer

    def get_queryset(self):
        return super().get_queryset()

    # Create a desactivate action
    @action(detail=True, methods=['post'])
    def desactivate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.pending_review = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # Create an activate action
    @action(detail=True, methods=['post'])
    def activate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = True
        instance.pending_review = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# OPEN PHARMACY
class OpenPharmaciesViewset(viewsets.ReadOnlyModelViewSet):
    # queryset = OpenPharmacy.objects.all()
    current_date = datetime.datetime.now()
    serializer_class = OpenPharmaciesListAdminSerializer

    def get_queryset(self):
        # Get pharmacies that are open at the current time
        return OpenPharmacy.objects.filter(open_from__lte=self.current_date, open_until__gte=self.current_date)


class OpenPharmaciesAdminViewset(viewsets.ModelViewSet):
    current_date = datetime.datetime.now()
    # queryset  = OpenPharmacy.objects.all()
    serializer_class = OpenPharmaciesAdminSerializer

    def get_serializer_class(self):

        print("ACTION NAME: ", self.action)
        if self.action == 'list' or self.action == 'retrieve':
            return OpenPharmaciesListAdminSerializer
        elif self.request.method == "POST" or self.request.method == "PATCH" or self.request.method == "PUT":
            return OpenPharmaciesAdminSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        # Get all open pharmacies
        return OpenPharmacy.objects.filter(open_from__lte=self.current_date, open_until__gte=self.current_date)


# OpenPharma All Pharmacies State

class PharmaciesCurrentStateViewset(viewsets.ReadOnlyModelViewSet):

    serializer_class = PharmaciesOpenStateSerializer
    queryset = Pharmacy.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
