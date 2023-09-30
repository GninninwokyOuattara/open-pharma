

from django.db import models
from django.db.models import Case, Count, F, When
from django.db.models.functions import TruncWeek
from django.http import JsonResponse
from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from openPharma.admin_serializers import (ActivityListSerializer,
                                          PharmacieDetailsSerializer,
                                          PharmaciesPendingReviewSerializer,
                                          PharmaciesSerializer)
from openPharma.models import Activity, OpenPharmacy, Pharmacy
from openPharmaRest.authorization import IsAuthenticated


class PharmaciesOverWeeksCountViews(IsAuthenticated, ReadOnlyModelViewSet):

    http_method_names = ['get']

    queryset = Pharmacy.objects.annotate(
        week=TruncWeek('date_created')).values('week').annotate(
        count=Count('id')).order_by('week')

    def list(self, request, *args, **kwargs):
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


class PharmaciesStatesCountView(IsAuthenticated, ReadOnlyModelViewSet):

    http_method_names = ['get']

    queryset = Pharmacy.objects.annotate(
        count=Count('id')).order_by('count')

    def list(self, request, *args, **kwargs):
        current_date = now()
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


class PharmaciesReviewsStatesCountView(IsAuthenticated, ReadOnlyModelViewSet):

    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
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


class OpenPharmaActivityViewset(IsAuthenticated, ReadOnlyModelViewSet):
    serializer_class = ActivityListSerializer
    queryset = Activity.objects.all()[:20]
    http_method_names = ['get']


class PharmaciesAllStatesCountView(IsAuthenticated, ReadOnlyModelViewSet):

    def list(self, request, *args, **kwargs):

        all_states = {
            "total": Pharmacy.objects.count(),
            "actives": Pharmacy.objects.filter(active=True).count(),
            "inactives": Pharmacy.objects.filter(active=False).count(),
            "actives_reviewed": Pharmacy.objects.filter(
                pending_review=False,
                active=True)
            .count(),
            "inactives_reviewed": Pharmacy.objects.filter(
                pending_review=False,
                active=False).count(),
            "inactives_pending_review": Pharmacy.objects.filter(
                active=False,
                pending_review=True)
            .count(),
            "actives_open": OpenPharmacy.objects.filter(
                pharmacy__active=True,
                pharmacy__pending_review=False,
                open_from__lte=now(), open_until__gte=now()).count(),

        }

        all_states["actives_not_open"] = int(all_states["actives"]) - \
            int(all_states["actives_open"])

        all_states["inactives_reviewed_open"] = OpenPharmacy.objects.filter(
            pharmacy__active=False,
            pharmacy__pending_review=False,
            open_from__lte=now(), open_until__gte=now()).count()

        all_states["inactives_reviewed_not_open"] = int(all_states["inactives_reviewed"]) - \
            int(all_states["inactives_reviewed_open"])

        all_states["inactives_pending_review_open"] = OpenPharmacy.objects.filter(
            pharmacy__active=False,
            pharmacy__pending_review=True,
            open_from__lte=now(), open_until__gte=now()).count()

        all_states["inactives_pending_review_not_open"] = int(all_states["inactives_pending_review"]) - \
            int(all_states["inactives_pending_review_open"])

        return Response(all_states, status=200)
