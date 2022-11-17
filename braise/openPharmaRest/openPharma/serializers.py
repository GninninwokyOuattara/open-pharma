from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework import serializers


class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "coordinates"]
        depth = 1


class OpenPharmacySerializer(serializers.ModelSerializer):

    pharmacy_id = serializers.IntegerField(source='pharmacy.id')

    class Meta:
        model = OpenPharmacy
        fields = ["id", "pharmacy_id", "open_from",
                  "open_until", "date_created", "date_updated"]
        depth = 1

    def create(self, validated_data):
        pharmacy_id = validated_data.pop('pharmacy')['id']
        pharmacy = Pharmacy.objects.get(id=pharmacy_id)
        open_pharmacy = OpenPharmacy.objects.create(
            pharmacy=pharmacy, **validated_data)
        return open_pharmacy


class OpenPharmacyDetailsSerializer(serializers.ModelSerializer):

    pharmacy = PharmacySerializer()

    class Meta:
        model = OpenPharmacy
        fields = ["id", "pharmacy", "open_from",
                  "open_until", "date_created", "date_updated"]
        depth = 1
