
from django.utils import timezone
from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class UserPharmaciesSerializer(ModelSerializer):
    open = SerializerMethodField()

    class Meta:
        model = Pharmacy
        fields = ["id", "name", "coordinates", "open"]

    def get_open(self, obj):
        currente_date = timezone.now()
        date = currente_date.strftime("%Y-%m-%d")
        if OpenPharmacy.objects.filter(pharmacy=obj, open_from__lte=currente_date, open_until__gte=currente_date):
            return True
        return False
