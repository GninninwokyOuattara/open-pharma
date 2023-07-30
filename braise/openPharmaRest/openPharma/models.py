# Create a user model
import uuid

from django.contrib.postgres.fields import ArrayField
from django.db import models


class Pharmacy(models.Model):
    class Meta:
        db_table = 'pharmacy'
        ordering = ['name', 'date_created', 'active']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    zone = models.CharField(max_length=100, blank=True, null=True, default="")
    director = models.CharField(max_length=100, blank=True, null=True)
    addresses = ArrayField(models.CharField(
        max_length=255), size=10, default=list, blank=True, null=True)
    phones = ArrayField(models.CharField(
        max_length=20), size=5, default=list, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    website = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(
        max_length=1000, default="Aucune description.", blank=True, null=True)
    images = ArrayField(models.CharField(
        max_length=1000), size=50, default=list, blank=True, null=True)
    google_maps_link = models.CharField(max_length=1000, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=False)
    pending_review = models.BooleanField(default=True)

    @property
    def coordinates(self):
        return {
            "latitude": self.latitude,
            "longitude": self.longitude
        }


class OpenPharmacy(models.Model):
    class Meta:
        db_table = 'open_pharmacy'

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    pharmacy = models.ForeignKey(
        Pharmacy, on_delete=models.CASCADE, related_name='open_pharmacies')
    open_from = models.DateField(blank=True, null=True)
    open_until = models.DateField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Activity(models.Model):
    class Meta:
        db_table = 'activity'
        ordering = ['-date_created']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    # type field is used to store the type of activity either review or report
    type = models.CharField(max_length=20)
    action = models.CharField(max_length=20)
    description = models.CharField(max_length=1000)
    date_created = models.DateTimeField(auto_now_add=True)


# TODO : Add a model for pharmacy related name to handle case where the pharmacy name is incorrectly spelled and should point to an already stored pharmacy.
