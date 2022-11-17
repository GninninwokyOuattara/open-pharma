from openPharma.models import Pharmacy
from rest_framework import serializers


class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = '__all__'
        depth = 1
