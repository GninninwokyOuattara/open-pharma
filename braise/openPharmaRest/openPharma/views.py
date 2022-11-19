import datetime

from django.shortcuts import render
from openPharma.models import OpenPharmacy, Pharmacy
from openPharma.serializers import (OpenPharmaciesAdminSerializer,
                                    OpenPharmaciesListAdminSerializer,
                                    PharmaciesAdminSerializer,
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

class OpenPharmaciesAdminViewset(viewsets.ModelViewSet):
    current_date = datetime.datetime.now()
    # queryset  = OpenPharmacy.objects.all()
    serializer_class = OpenPharmaciesAdminSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return OpenPharmaciesListAdminSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        # Get all open pharmacies
        return OpenPharmacy.objects.filter(open_from__lte=self.current_date, open_until__gte=self.current_date)

    # def create(self, request, *args, **kwargs):
    #     print("Hello World")
    #     return Response("Hello Worlder", status=status.HTTP_200_OK)
