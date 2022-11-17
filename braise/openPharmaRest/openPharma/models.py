# Create a user model
from django.contrib.postgres.fields import ArrayField
from django.db import models


class Pharmacy(models.Model):
    class Meta:
        db_table = 'pharmacy'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    director = models.CharField(max_length=100, blank=True, null=True)
    addresses = ArrayField(models.CharField(
        max_length=255), size=10, default=list, blank=True, null=True)
    phones = ArrayField(models.CharField(
        max_length=255), size=10, default=list, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    website = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(
        max_length=1000, default="Aucune description.", blank=True, null=True)
    images = ArrayField(models.CharField(
        max_length=255), size=50, default=list, blank=True, null=True)
    google_maps_link = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=False)
    pending_review = models.BooleanField(default=True)

    @property
    def coordinates(self):
        return [self.latitude, self.longitude]


class OpenPharmacy(models.Model):
    class Meta:
        db_table = 'open_pharmacy'

    id = models.AutoField(primary_key=True)
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    day = models.CharField(max_length=10)
    open_from = models.TimeField()
    open_until = models.TimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


# TODO : Add a model for pharmacy related name to handle case where the pharmacy name is incorrectly spelled and should point to an already stored pharmacy.
