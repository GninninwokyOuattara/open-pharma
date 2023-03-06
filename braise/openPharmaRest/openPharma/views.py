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
    def deactivate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def activate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = True
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class PharmaciesPendingReviewAdminViewset(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.filter(pending_review=True)
    serializer_class = PharmaciesPendingReviewAdminSerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        return super().get_queryset()

    @action(detail=True, methods=['post'])
    def deactivate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.pending_review = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

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

    current_date = datetime.datetime.now()

    serializer_class = PharmaciesOpenStateSerializer

    queryset = Pharmacy.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)


# DATAS COUNTERS VIEWS


class PharmaciesAllStateCountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PharmaciesOpenStateSerializer

    def list(self, request, *args, **kwargs):
        current_date = datetime.datetime.now()
        active_pharmacies_count = Pharmacy.objects.filter(active=True).count()
        inactive_Pharmacies_count = Pharmacy.objects.filter(
            active=False).count()
        open_pharmacies_count = OpenPharmacy.objects.filter(
            open_from__lte=current_date, open_until__gte=current_date).count()

        count_summary = {
            "active_pharmacies_count": self.active_pharmacies_count,
            "inactive_Pharmacies_count": self.inactive_Pharmacies_count,
            "open_pharmacies_count": self.open_pharmacies_count
        }
        return Response(count_summary)


class ActivePharmaciesCountViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Pharmacy.objects.filter(active=True)
    serializer_class = PharmaciesSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response({'count': queryset.count()})


class InactivePharmaciesCountViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Pharmacy.objects.filter(active=False)
    serializer_class = PharmaciesSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response({'count': queryset.count()})


class OpenPharmacyCountViewset(viewsets.ReadOnlyModelViewSet):
    current_date = datetime.datetime.now()
    queryset = OpenPharmacy.objects.filter(
        open_from__lte=current_date, open_until__gte=current_date)
    serializer_class = OpenPharmaciesListAdminSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response({'count': queryset.count()})


#

class PharmaciesStateAndCountViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = PharmaciesOpenStateSerializer
    # queryset = Pharmacy.objects.all()
    # only take those that are not pending review
    queryset = Pharmacy.objects.filter(pending_review=False)
    current_date = datetime.datetime.now()

    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        active_pharmacies_count = Pharmacy.objects.filter(active=True).count()
        inactive_Pharmacies_count = Pharmacy.objects.filter(
            active=False, pending_review=False).count()
        open_pharmacies_count = OpenPharmacy.objects.filter(
            open_from__lte=self.current_date, open_until__gte=self.current_date).count()

        count_summary = {
            "active_pharmacies_count": active_pharmacies_count,
            "inactive_Pharmacies_count": inactive_Pharmacies_count,
            "open_pharmacies_count": open_pharmacies_count
        }

        response = {"summary": count_summary, "pharmacies": serializer.data}
        return Response(response)
