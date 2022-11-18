from django.shortcuts import render
from openPharma.models import OpenPharmacy, Pharmacy
from openPharma.serializers import (PharmaciesAdminSerializer,
                                    PharmaciesSerializer)
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class PharmaciesViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesSerializer


class PharmaciesAdminViewset(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmaciesAdminSerializer

    def get_queryset(self):
        # Get query all params

        return super().get_queryset()

    # Create a desactivate action
    @action(detail=True, methods=['post'])
    def desactivate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # Create an activate action
    @action(detail=True, methods=['post'])
    def activate(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = True
        instance.pending_review = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
