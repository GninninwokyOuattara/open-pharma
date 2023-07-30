

from django.db.models import Count
from django.db.models.functions import TruncWeek
from openPharma.models import Pharmacy
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from openPharmaRest.authorization import IsAuthenticated


class PharmaciesOverWeeksViewset(IsAuthenticated, ReadOnlyModelViewSet):

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


# get_pharmacies_states


# get_reviews_states
