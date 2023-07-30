
from openPharma.admin_serializers import PharmaciesSerializer
from openPharma.models import Pharmacy
# import GenericAPIView
from rest_framework.generics import GenericAPIView
# import PageNumberPagination
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class AdminAuthorizationMixin:
    # Will force authorization on any view extending this mixin
    permission_classes = (IsAuthenticated,)


class ModelViewSetWithAuthorization(AdminAuthorizationMixin, ModelViewSet):
    pass


class ResultsSetPagination(PageNumberPagination, GenericAPIView):
    page_size = 25
    page_size_query_param = 'size'
    max_page_size = 100


class PharmaciesAsAdminViewset(ModelViewSetWithAuthorization, ResultsSetPagination):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesSerializer

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
