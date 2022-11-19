import random

from django.core.management.base import BaseCommand, CommandError
# import pharmact
from openPharma.models import OpenPharmacy, Pharmacy


class Command(BaseCommand):
    help = 'Populate database'

    def handle(self, *args, **options):
        # pharmact.populate_db()
        # self.stdout.write(self.style.SUCCESS('Successfully populated database'))
        # Create ten pharmacies
        for i in range(10):

            # Random pharmacy name
            pharmacy_name = "Pharmacy " + str(i)
            # Generate random pharmacy latitude and longitude
            pharmacy_latitude = random.uniform(-90, 90)
            pharmacy_longitude = random.uniform(-180, 180)

            # Random 10 digits phone number that start with 07
            pharmacy_phone = ["07" + str(random.randint(10000000, 99999999))]

            # Generate three addresses
            pharmacy_addresses = [
                "Address " + str(i) + " " + str(j) for j in range(3)]

            # create pharmacy
            pharmacy = Pharmacy.objects.create(
                name=pharmacy_name,
                director="Director " + str(i),
                addresses=pharmacy_addresses,
                phones=pharmacy_phone,
                latitude=pharmacy_latitude,
                longitude=pharmacy_longitude
            )
            pharmacy.save()

        self.stdout.write(self.style.SUCCESS(
            'Successfully populated database'))
