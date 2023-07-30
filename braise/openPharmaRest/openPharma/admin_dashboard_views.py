

from django.db.models import Count
from django.db.models.functions import TruncWeek
from django.utils.timezone import now
from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

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
