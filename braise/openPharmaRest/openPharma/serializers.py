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

    def validate(self, data):
        # if pending_review is True, active must be False
        if data["pending_review"] and data["active"]:
            raise serializers.ValidationError(
                "pending_review and active cannot be both True")

    def create(self, validated_data):
        return Pharmacy.objects.create(**validated_data)

    def delete(self, instance):
        instance.delete()


class PharmaciesPendingReviewAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "coordinates", "date_created", "date_updated", "active", "pending_review"]

    # def create(self, validated_data):
    #     return Pharmacy.objects.create(**validated_data)

    # def delete(self, instance):
    #     instance.delete()


# OPEN PHARMACY SERIALIZER

class OpenPharmaciesAdminSerializer(serializers.ModelSerializer):

    pharmacy_id = serializers.IntegerField(
        source="pharmacy", write_only=True)

    class Meta:
        model = OpenPharmacy
        fields = ["id", "pharmacy_id", "open_from",
                  "open_until"]

    def create(self, validated_data):
        print("VALIDATED DATA", validated_data)
        # Validate date
        # if validated_data["open_from"] > validated_data["open_until"]:
        #     raise serializers.ValidationError("Invalid date range.")

        # Get pharmacy by pharmacy_id
        print("SHAT")

        return "Hello World"

        # return OpenPharmacy.objects.create(**validated_data)


class OpenPharmaciesListAdminSerializer(serializers.ModelSerializer):

    pharmacy = PharmaciesAdminSerializer()

    class Meta:
        model = OpenPharmacy
        fields = ["id", "pharmacy", "open_from",
                  "open_until", "date_created", "date_updated"]
