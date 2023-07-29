
from openPharma.admin_serializers import PharmaciesSerializer
from openPharma.models import Pharmacy
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


class AdminAuthorizationMixin:
    # Will force authorization on any view extending this mixin
    permission_classes = (IsAuthenticated,)


class ModelViewSetWithAuthorization(AdminAuthorizationMixin, ModelViewSet):
    pass


class PharmaciesAsAdminViewset(ModelViewSetWithAuthorization):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesSerializer
