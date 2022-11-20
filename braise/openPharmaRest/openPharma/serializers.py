
from django.utils import timezone
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
                "Pharmacy cannot be active and pending review at the same time.")
        else:
            return data

    def create(self, validated_data):
        return Pharmacy.objects.create(**validated_data)

    def delete(self, instance):
        instance.delete()


class PharmaciesPendingReviewAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "coordinates", "date_created", "date_updated", "active", "pending_review"]


# OPEN PHARMACY SERIALIZER

class OpenPharmaciesAdminSerializer(serializers.ModelSerializer):

    pharmacy_id = serializers.IntegerField(
        write_only=True)

    class Meta:
        model = OpenPharmacy

        fields = ["id", "pharmacy_id", "open_from",
                  "open_until"]

    def validate_pharmacy_id(self, value):

        pharmacy = Pharmacy.objects.filter(id=value)
        if not pharmacy:
            raise serializers.ValidationError(
                "Pharmacy not found.")
        else:
            pharmacy = pharmacy[0]

        if not pharmacy.active:
            raise serializers.ValidationError(
                "An unactive pharmacy cannot be open.")
        return value

    def validate(self, data):
        # get the dates
        open_from = data["open_from"]
        open_until = data["open_until"]

        if open_from > open_until:
            raise serializers.ValidationError("Invalid date range.")

        pharmacy_id = data["pharmacy_id"]
        pharmacy = Pharmacy.objects.get(id=pharmacy_id)

        open_pharmacies = OpenPharmacy.objects.filter(
            pharmacy=pharmacy, open_from__lte=open_from, open_until__gte=open_until)
        if open_pharmacies:
            raise serializers.ValidationError(
                "Pharmacy already open on that date range.")

        return data

    def create(self, validated_data):
        return OpenPharmacy.objects.create(**validated_data)


class OpenPharmaciesListAdminSerializer(serializers.ModelSerializer):

    pharmacy = PharmaciesAdminSerializer()

    class Meta:
        model = OpenPharmacy
        fields = ["id", "pharmacy", "open_from",
                  "open_until", "date_created", "date_updated"]


# All current pharmacies state

class PharmaciesOpenStateSerializer(serializers.ModelSerializer):

    open_date_range = serializers.SerializerMethodField()

    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "coordinates", "date_created", "date_updated", "open_date_range"]

    def get_open_date_range(self, obj):

        open_pharmacy = OpenPharmacy.objects.filter(
            pharmacy=obj, open_from__lte=timezone.now(), open_until__gte=timezone.now())

        if open_pharmacy:
            date_range_string = open_pharmacy[0].open_from.strftime(
                "%d/%m/%Y") + " - " + open_pharmacy[0].open_until.strftime("%d/%m/%Y")
            open_from = open_pharmacy[0].open_from.strftime(
                "%d/%m/%Y")
            open_until = open_pharmacy[0].open_until.strftime(
                "%d/%m/%Y")
            return {"open_from": open_from, "open_until": open_until, "date_range_string": date_range_string}
        else:
            return None
