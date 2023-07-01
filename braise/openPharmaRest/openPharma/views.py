import datetime

from django.db.models import Count
from django.db.models.functions import TruncWeek
from django.http import Http404
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from openPharma.models import Activity, OpenPharmacy, Pharmacy
from openPharma.serializers import (ActivityListSerializer,
                                    OpenPharmaciesAdminSerializer,
                                    OpenPharmaciesListAdminSerializer,
                                    PharmaciesAdminSerializer,
                                    PharmaciesOpenStateSerializer,
                                    PharmaciesPendingReviewAdminSerializer,
                                    PharmaciesSerializer)


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

        Activity.objects.create(
            type="state",
            action="deactivation",
            description=f"{instance.name} has been deactivated",
        )
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def activate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = True
        instance.save()
        serializer = self.get_serializer(instance)
        Activity.objects.create(
            type="state",
            action="activation",
            description=f"{instance.name} has been activated",
        )
        return Response(serializer.data)


class PharmaciesPendingReviewAdminViewset(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.filter(pending_review=True)
    serializer_class = PharmaciesPendingReviewAdminSerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        return super().get_queryset()

    @action(detail=False, methods=['post'], url_path="batch-review")
    def batch_review(self, request, *args, **kwargs):

        succeed = 0
        failed = 0
        try:
            data = request.data
            print("DATA", data)
            review = data["review"]
            if review != "activate" and review != "deactivate":
                return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Invalid review value"})

            shouldActivate = True if review == "activate" else False
            pharmacies = data["pharmacies"]

            for pharmacy in pharmacies:
                try:
                    instance = Pharmacy.objects.get(id=pharmacy["id"])
                    instance.active = shouldActivate
                    instance.pending_review = False
                    instance.save()
                    succeed += 1
                except Exception as error:
                    failed += 1
                    continue

            Activity.objects.create(
                type="review",
                action="accepted" if shouldActivate else "rejected",
                description=f"{succeed} pharmacies have been reviewed and {review}d",
            )

            return Response(data={"message": f"{succeed} pharmacies have been {review}d and {failed} failed"}, status=status.HTTP_200_OK)
        except Exception as error:
            print("ERROR", type(error))
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"message": f"An unknow error occured. Please try again later"})

    @action(detail=True, methods=['post'])
    def deactivate(self, request, *args, **kwargs):

        # get the data posted
        data = request.data

        try:
            instance = self.get_object()
            instance.description = data["description"]
            instance.addresses = data["addresses"]
            instance.phones = data["phones"]
            instance.email = data["email"]
            instance.website = data["website"]
            instance.google_maps_link = data["google_maps_link"]
            instance.latitude = data["latitude"]
            instance.longitude = data["longitude"]
            instance.name = data["name"]
            instance.director = data["director"]
            instance.active = False
            instance.pending_review = False
            instance.save()
            serializer = self.get_serializer(instance)
            Activity.objects.create(
                type="review",
                action="rejected",
                description=f"{instance.name} has been reviewed and deactivated",
            )
            return Response(data={
                "message": f"{instance.name} has been deactivated",
                "pharmacy": serializer.data})
        except Http404 as error:
            return Response(status=status.HTTP_404_NOT_FOUND, data={"message": f"pharmacy not found"})
        except Exception as error:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"message": f"An unknow error occured. Please try again later"})

    @action(detail=True, methods=['post'])
    def activate(self, request, *args, **kwargs):

        data = request.data

        try:
            instance = self.get_object()
            instance.description = data["description"]
            instance.addresses = data["addresses"]
            instance.phones = data["phones"]
            instance.email = data["email"]
            instance.website = data["website"]
            instance.google_maps_link = data["google_maps_link"]
            instance.latitude = data["latitude"]
            instance.longitude = data["longitude"]
            instance.name = data["name"]
            instance.director = data["director"]

            instance.active = True
            instance.pending_review = False

            instance.save()
            serializer = self.get_serializer(instance)

            # insert a new Activity
            Activity.objects.create(
                type="review",
                action="accepted",
                description=f"{instance.name} has been reviewed and accepted",
            )

            return Response(data={
                "message": f"{instance.name} has been activated",
                "pharmacy": serializer.data})
        except Http404 as error:
            return Response(status=status.HTTP_404_NOT_FOUND, data={"message": f"pharmacy not found"})
        except Exception as error:
            print("Error", error)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"message": f"An unknow error occured. Please try again later"})


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


class OpenPharmaPharmaciesStatesAdminViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PharmaciesOpenStateSerializer
    queryset = Pharmacy.objects.filter(pending_review=False)


# DATAS COUNTERS VIEWS


class PharmaciesAllStateCountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = PharmaciesOpenStateSerializer

    def list(self, request, *args, **kwargs):

        active_pharmacies_count = Pharmacy.objects.filter(active=True).count()
        inactive_Pharmacies_count = Pharmacy.objects.filter(
            active=False).count()
        open_pharmacies_count = OpenPharmacy.objects.filter(
            open_from__lte=self.current_date, open_until__gte=self.current_date).count()

        count_summary = {
            "active_pharmacies_count": active_pharmacies_count,
            "inactive_Pharmacies_count": inactive_Pharmacies_count,
            "open_pharmacies_count": open_pharmacies_count
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
    queryset = Pharmacy.objects.filter(pending_review=False, active=True)
    current_date = datetime.datetime.now()

    def list(self, request, *args, **kwargs):

        # queryset = self.get_queryset()
        serializer = self.get_serializer(self.queryset, many=True)

        active_pharmacies_count = Pharmacy.objects.filter(active=True).count()
        inactive_pharmacies_count = Pharmacy.objects.filter(
            active=False, pending_review=False).count()
        open_pharmacies_count = OpenPharmacy.objects.filter(
            open_from__lte=self.current_date, open_until__gte=self.current_date).count()

        count_summary = {
            "active_pharmacies_count": active_pharmacies_count,
            "inactive_Pharmacies_count": inactive_pharmacies_count,
            "open_pharmacies_count": open_pharmacies_count
        }

        response = {"summary": count_summary, "pharmacies": serializer.data}
        return Response(response)


########################################################
# VIEW FOR STATISTICS
########################################################

class PharmaciesStatisticsViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = PharmaciesSerializer
    queryset = Pharmacy.objects.all()
    http_method_names = ['get']

    # @action(detail=False, methods=['get'], url_path="pharmacies-over-weeks")
    def get_pharmacies_over_weeks(self, request, *args, **kwargs):
        # return the count of pharmacies after each week
        pharmacies = Pharmacy.objects.annotate(
            week=TruncWeek('date_created')).values('week').annotate(
            count=Count('id')).order_by('week')

        data = []
        for pharmacy in pharmacies:
            data.append({
                'week': pharmacy['week'].strftime('%Y-%m-%d'),
                'count': pharmacy['count']
            })

        return Response(data)

    # GET

    # @action(detail=False, methods=['get'], url_path="pharmacies-states")
    def get_pharmacies_states(self, request, *args, **kwargs):
        print("Hello")
        current_date = datetime.datetime.now()
        active_pharmacies_count = Pharmacy.objects.filter(active=True).count()
        inactive_Pharmacies_count = Pharmacy.objects.filter(
            active=False).count()
        open_pharmacies_count = OpenPharmacy.objects.filter(
            open_from__lte=current_date, open_until__gte=current_date).count()

        data = [
            {
                "name": "Active Pharmacies",
                "count": active_pharmacies_count,
                "fill": "#3182CE",
            },

            {
                "name": "Inactive Pharmacies",
                "count": inactive_Pharmacies_count,
                "fill": "#718096",
            },
            {
                "name": "Open Pharmacies",
                "count": open_pharmacies_count,
                "fill": "#38A169",
            }
        ]

        return Response(data)

    # @action(detail=False, methods=['get'], url_path="pharmacies-reviews-states")
    def get_reviews_states(self, request, *args, **kwargs):
        # get number of active and inactive pharmacies
        pending_review_pharmacies_count = Pharmacy.objects.filter(
            pending_review=True).count()
        reviewed_pharmacies_count = Pharmacy.objects.filter(
            pending_review=False).count()

        data = [
            {
                "name": "Pharmacies Pending Review",
                "count": pending_review_pharmacies_count,
                "fill": "#718096",
            },

            {
                "name": "Pharmacies Reviewed",
                "count": reviewed_pharmacies_count,
                "fill": "#3182CE",
            }
        ]

        return Response(data)


class OpenPharmaActivityViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActivityListSerializer
    queryset = Activity.objects.all()[:20]
    http_method_names = ['get']
