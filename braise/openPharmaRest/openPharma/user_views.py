
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from openPharma.users_serializers import UserPharmaciesSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

# import pharmacy model
from .models import Pharmacy


class UsersPharmaciesViewset(ReadOnlyModelViewSet):
    serializer_class = UserPharmaciesSerializer
    queryset = Pharmacy.objects.filter(active=True, pending_review=False)

    @method_decorator(cache_page(60*2))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)