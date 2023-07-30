
from django.utils import timezone
from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class PharmacyOpenState(ModelSerializer):
    open = SerializerMethodField()

    def get_open(self, obj):
        """
        Check if a pharmacy is currently open.

        Args:
            obj (Pharmacy): The pharmacy object to check.

        Returns:
            bool: True if the pharmacy is open, False otherwise.
        """
        currente_date = timezone.now()
        date = currente_date.strftime("%Y-%m-%d")
        if OpenPharmacy.objects.filter(pharmacy=obj, open_from__lte=currente_date, open_until__gte=currente_date):
            return True
        return False


class UserPharmaciesSerializer(PharmacyOpenState):

    class Meta:
        model = Pharmacy
        fields = ["id", "name", "coordinates", "open"]


class UsersPharmacieDetailsSerializer(PharmacyOpenState):
    class Meta:
        model = Pharmacy
        fields = ("id", "name", "zone", "description", "director",
                  "addresses", "phones", "coordinates", "open")
