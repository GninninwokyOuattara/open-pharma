
from bs4 import BeautifulSoup
from django.db.models import Q
from openPharma.admin_serializers import (
    PharmacieDetailsSerializer, PharmaciesPendingReviewSerializer,
    PharmaciesPendingReviewSerializerWithOpenColumn, PharmaciesSerializer)
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
        active = request.query_params.get("active")
        open = request.query_params.get("open")

        queryset = Pharmacy.objects.filter(
            Q(name__icontains=name),
            pending_review=False
        )

        if active in ["true", "false"]:
            active = True if active == "true" else False
            queryset = queryset.filter(
                active=active
            )

        if zone:
            queryset = queryset.filter(
                zone__icontains=zone
            )

        if active:
            queryset = queryset.filter(
                active=active
            )

        serializer = PharmaciesSerializer(queryset, many=True)
        filtered_data = serializer.data

        if open in ["true", "false"]:
            open = True if open == "true" else False
            filtered_data = [
                data for data in serializer.data if data["open"] == open]

        page = self.paginate_queryset(filtered_data, request)

        return self.get_paginated_response(page)

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


class PharmaciesZoneAsAdminViewset(ReadOnlyModelViewSet):

    queryset = Pharmacy.objects.filter(active=True).values_list(
        "zone", flat=True).distinct().order_by("zone")

    def list(self, request, *args, **kwargs):
        return Response(self.queryset, status=200)


class PharmaciesPendingReviewAsAdminViewset(ModelViewSetWithAuthorization, ResultsSetPagination):
    http_method_names = ["get", "post"]
    queryset = Pharmacy.objects.filter(pending_review=True)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacieDetailsSerializer

        return PharmaciesPendingReviewSerializer

    def list(self, request, *args, **kwargs):

        name = request.query_params.get("name") or ""
        zone = request.query_params.get("zone") or ""
        open = request.query_params.get("open")

        queryset = Pharmacy.objects.filter(
            name__icontains=name,
            # zone__icontains=zone,
            pending_review=True
        ).order_by("-date_created", "name", "zone")

        if open in ["true", "false"]:
            open = True if open == "true" else False
            serializer = PharmaciesPendingReviewSerializerWithOpenColumn(
                queryset, many=True)
            serializer_data = serializer.data
            filtered_data = [
                data for data in serializer_data if data["open"] == open
            ]
            page = self.paginate_queryset(filtered_data, request)
            return self.get_paginated_response(page)

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
            instance.save()
            serializer = self.get_serializer(instance)
            message = f"{instance.name} has been rejected."
            data = serializer.data
            ActivityManager.rejected_after_review(instance)
            return Response({"message": message, "data": data}, status=200)

        except Exception as error:
            return Response({"message": "An unexpected error occured"}, status=500)

    @action(detail=False, methods=["post"], url_path="batch-review")
    def batch_review(self, request, *args, **kwargs):
        review_action = request.data.get("review_action")
        pharmacies = request.data.get("pharmacies")  # A list of pharmacy ids
        sucess, failure = 0, 0

        if review_action not in ["accept", "reject"]:
            return Response("Invalid review action", status=400)

        try:
            for pharmacy_id in pharmacies:
                # get pharmacy with pharmacy id
                pharmacy_to_review = Pharmacy.objects.get(
                    id=pharmacy_id)
                print("Batch review of ", pharmacy_to_review.name)
                if review_action == "accept":
                    pharmacy_to_review.active = True
                elif review_action == "reject":
                    pharmacy_to_review.active = False

                pharmacy_to_review.pending_review = False
                pharmacy_to_review.save()
                sucess += 1

                if review_action == "accept":
                    ActivityManager.accepted_after_review(pharmacy_to_review)
                elif review_action == "reject":
                    ActivityManager.rejected_after_review(pharmacy_to_review)

        except Exception as error:
            failure += 1

        response_message = f"{sucess} pharmacies {review_action}ed and {failure} failed."
        body = request.data
        print("request body", body)

        return Response({"message": response_message}, status=200)


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
