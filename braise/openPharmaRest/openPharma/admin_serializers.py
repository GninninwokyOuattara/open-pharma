from django.utils import timezone
from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework.serializers import (ModelSerializer, SerializerMethodField,
                                        ValidationError)


class BaseAdminSerializer(ModelSerializer):
    open = SerializerMethodField()

    class meta:
        model = Pharmacy
        fields = "__all__"

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


class PharmaciesSerializer(BaseAdminSerializer):
    class Meta:
        model = Pharmacy
        fields = ("id", "name", "zone", "coordinates", "active", "open")

    def validate(self, data):
        request_type = self.context["request"].method

        if data.get("pending_review", True) and data.get("active", False):
            raise ValidationError(
                "Pharmacy cannot be active and pending review at the same time.")

        if request_type == "POST" and Pharmacy.objects.filter(name=data["name"], zone=data["zone"]).exists():
            raise ValidationError(
                "A pharmacy with this name already exist at this zone.")
        else:
            return data

    def create(self, validated_data):
        return Pharmacy.objects.create(**validated_data)


class PharmacieDetailsSerializer(BaseAdminSerializer):
    class Meta:
        model = Pharmacy
        fields = ("id", "name", "zone", "director", "addresses", "phones",
                  "description", "latitude", "longitude", "coordinates", "open", "date_created")
