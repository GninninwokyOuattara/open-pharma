
from django.utils import timezone
from openPharma.models import Activity, OpenPharmacy, Pharmacy
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
        # Check if data has pending_review key
        request_type = self.context["request"].method
        print("REQUEST TYPE", request_type)

        if data.get("pending_review", True) and data.get("active", False):
            raise serializers.ValidationError(
                "Pharmacy cannot be active and pending review at the same time.")

        if request_type == "POST" and Pharmacy.objects.filter(latitude=data["latitude"], longitude=data["longitude"], name=data["name"]).exists():
            raise serializers.ValidationError(
                "A pharmacy with this name already exist on this location.")
        else:
            return data

    def create(self, validated_data):
        return Pharmacy.objects.create(**validated_data)

    def update(self, instance, validated_data):
        print("VALIDATED DATA", validated_data)
        print("INSTANCE", instance)
        instance.name = validated_data.get('name', instance.name)
        instance.director = validated_data.get('director', instance.director)
        instance.addresses = validated_data.get(
            'addresses', instance.addresses)
        instance.phones = validated_data.get('phones', instance.phones)
        instance.email = validated_data.get('email', instance.email)
        instance.website = validated_data.get('website', instance.website)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.images = validated_data.get('images', instance.images)
        instance.google_maps_link = validated_data.get(
            'google_maps_link', instance.google_maps_link)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get(
            'longitude', instance.longitude)

        instance.active = validated_data.get('active', instance.active)
        instance.pending_review = validated_data.get(
            'pending_review', instance.pending_review)
        instance.date_updated = timezone.now()
        instance.save()

        # get django database date

        return instance

    def delete(self, instance):
        instance.delete()


class PharmaciesPendingReviewAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ["id", "name", "director", "addresses", "phones", "email", "website", "description", "images",
                  "google_maps_link", "latitude", "longitude",  "coordinates", "date_created", "date_updated", "active", "pending_review"]


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
    open = serializers.SerializerMethodField()

    class Meta:
        model = Pharmacy
        fields = ["id", "name",  "open", "latitude",
                  "longitude", "coordinates", "open_date_range"]

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

    def get_open(self, obj):
        # Check if pharmacy if open at current date
        open_pharmacy = OpenPharmacy.objects.filter(
            pharmacy=obj, open_from__lte=timezone.now(), open_until__gte=timezone.now())

        if open_pharmacy:
            return True
        return False


class ActivityListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity
        fields = "__all__"
        # order by date created
