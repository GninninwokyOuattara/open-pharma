
from bs4 import BeautifulSoup
from openPharma.admin_serializers import (PharmacieDetailsSerializer,
                                          PharmaciesPendingReviewSerializer,
                                          PharmaciesSerializer)
from openPharma.classes.logger import ConsoleLogger
from openPharma.classes.maps_scrapper import GoogleMapsCoordinatesScrapper
from openPharma.classes.pages import PharmaConsultPage
from openPharma.classes.processors import (ActivityManager,
                                           PharmaConsultDataUpdateDBManager,
                                           PharmaConsultPageProcessor)
from openPharma.models import Pharmacy
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from openPharmaRest.authorization import (IsAuthenticated,
                                          ModelViewSetWithAuthorization)
from openPharmaRest.panigation import ResultsSetPagination


class PharmaciesAsAdminViewset(ModelViewSetWithAuthorization, ResultsSetPagination):
    queryset = Pharmacy.objects.all()
    # serializer_class = PharmaciesSerializer
    http_method_names = ["get", "post", "patch"]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacieDetailsSerializer
        elif self.request.method == "PATCH":
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
            ActivityManager.pharmacy_activated(instance)
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
            ActivityManager.pharmacy_deactivated(instance)

            return Response({"message": message, "data": data}, status=200)
        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)


class PharmaciesPendingReviewAsAdminViewset(ModelViewSetWithAuthorization, ResultsSetPagination):
    queryset = Pharmacy.objects.filter(pending_review=True)
    serializer_class = PharmaciesSerializer
    http_method_names = ["get", "post"]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacieDetailsSerializer

        return PharmaciesPendingReviewSerializer

    def list(self, request, *args, **kwargs):

        name = request.query_params.get("name") or ""
        zone = request.query_params.get("zone") or ""

        queryset = Pharmacy.objects.filter(
            name__icontains=name,
            # zone__icontains=zone,
            pending_review=True
        )
        page = self.paginate_queryset(queryset, request)
        serializer = PharmaciesPendingReviewSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=['post'])
    def accept(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.pending_review = False
            instance.active = True
            instance.save()
            serializer = self.get_serializer(instance)

            message = f"{instance.name} has been reviewed and is now active."
            data = serializer.data
            ActivityManager.accepted_after_review(instance)
            return Response({"message": message, "data": data}, status=200)

        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)

    @action(detail=True, methods=['post'])
    def reject(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.pending_review = False
            instance.active = False
            instance.delete()
            serializer = self.get_serializer(instance)
            message = f"{instance.name} has been rejected."
            data = serializer.data
            ActivityManager.rejected_after_review(instance)
            return Response({"message": message, "data": data}, status=200)

        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)


class PharmaciesActualizerView(ModelViewSetWithAuthorization):

    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        try:
            pharmaConsultPage = PharmaConsultPage(
                "https://pharma-consults.net/pharmacies-gardes")
            pageSoup = BeautifulSoup(
                pharmaConsultPage.get_page(), "html.parser")
            pharmaConsultPP = PharmaConsultPageProcessor(page=pageSoup)
            pharmacies = pharmaConsultPP.get_datas()

            logger = ConsoleLogger()

            pharmacyDBManager = PharmaConsultDataUpdateDBManager(
                pharmacies, logger)
            processing_result = pharmacyDBManager.process_pharmacies()
            ActivityManager.manual_actualization()
            return Response(processing_result, status=200)
        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)


class SearchApiView(IsAuthenticated, ReadOnlyModelViewSet):

    http_method_names = ['get']

    def list(self, request, *args, **kwargs):

        name = request.query_params.get("name")
        zone = request.query_params.get("zone")

        if not name or not zone:
            return Response({"error": "name and zone parameter are required."}, status=400)

        maps_scrapper = GoogleMapsCoordinatesScrapper()
        latitude, longitude = maps_scrapper.get_pharmacy_coordinates(
            name=name, zone=zone)

        return Response(
            {"coordinates": {"latitude": latitude, "longitude": longitude}},
            status=200)
