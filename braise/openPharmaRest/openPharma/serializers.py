from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework import serializers


class PharmaciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "coordinates", "date_created", "date_updated", "active", "pending_review"]


class PharmaciesAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "latitude", "longitude", "coordinates", "date_created", "date_updated", "active", "pending_review"]

    def create(self, validated_data):
        return Pharmacy.objects.create(**validated_data)

    def delete(self, instance):
        instance.delete()
