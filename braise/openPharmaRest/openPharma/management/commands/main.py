
import random
from datetime import datetime

from django.core.management.base import BaseCommand, CommandError
# import pharmact
from openPharma.models import OpenPharmacy, Pharmacy
from openTracker.utils import get_currently_open_pharmacies_datas


class Command(BaseCommand):
    help = 'Collects currently open pharmacies on the internet to update the database'
    n_insertions = 0
    n_updates = 0
    n_skipping = 0

    def perform_get_currently_open_pharmacies_datas(self):
        """Run get_currently_open_pharmacies_datas function while also keeping track of its performance and handling printing informations in console.
        """
        print("Collecting currently open pharmacies. Please wait...")
        # get the timestamp
        start = datetime.now()
        pharmacies_datas = get_currently_open_pharmacies_datas()
        end = datetime.now()
        # duration in sec
        duration = (end - start).total_seconds()
        self.stdout.write(self.style.SUCCESS(
            f"Task completed in {duration} seconds"))
        self.stdout.write(self.style.SUCCESS(
            f'There is currently {len(pharmacies_datas)} open pharmacies'))

        return pharmacies_datas

    def perform_pharmacy_insertion(self, pharmacy_datas):
        """Perform a regular pharmacy insertion while handling possible error and printing

        Args:
            pharmacy_datas (__dict__): An object of key value pair representing a pharmacy
        """
        try:
            # Pharmacy.objects.create(
            #     **pharmacy_datas, pending_review=True, active=False)
            Pharmacy.objects.create(
                name=pharmacy_datas["name"],
                director=pharmacy_datas["director"],
                addresses=pharmacy_datas["addresses"],
                phones=pharmacy_datas["phones"],
                google_maps_link=pharmacy_datas["google_maps_link"],
                latitude=pharmacy_datas["latitude"],
                longitude=pharmacy_datas["longitude"],
                pending_review=True,
                active=False)

            self.stdout.write(self.style.SUCCESS(
                f'Pharmacy {pharmacy_datas["name"]} created and pending review'))
            self.n_insertions += 1
        except Exception as err:
            # TODO handle exception.
            pass

    def perform_pharmacy_opening(self, pharmacy, pharmacy_datas):
        """Perform the act of opening the pharmacy on a date range.

        Args:
            pharmacy (Pharmacy): A pharmacy open 
        """
        try:
            OpenPharmacy.objects.create(
                pharmacy=pharmacy, open_from=pharmacy_datas["open_from"], open_until=pharmacy_datas["open_until"])
            self.stdout.write(self.style.SUCCESS(
                f'Pharmacy {pharmacy_datas["name"]} opening data has been set.'))
            self.n_updates += 1
        except Exception as err:
            # TODO Better handling of this exception...
            pass

    def handle(self, *args, **options):
        try:
            pharmacies_datas = self.perform_get_currently_open_pharmacies_datas()
            for pharmacy_datas in pharmacies_datas:
                print(pharmacy_datas["name"])
                # Look for the pharmacy in the db
                pharmacy = Pharmacy.objects.filter(
                    name=pharmacy_datas["name"], latitude=pharmacy_datas["latitude"], longitude=pharmacy_datas["longitude"])
                if not pharmacy.exists():
                    # Doesn't exist, insert new ones as pending_review by admin
                    self.perform_pharmacy_insertion(pharmacy_datas)
                    continue

                pharmacy = pharmacy[0]
                # Check if this pharmacy isn't alrady open at this date range
                open_pharmacy = OpenPharmacy.objects.filter(
                    pharmacy=pharmacy, open_from=pharmacy_datas["open_from"], open_until=pharmacy_datas["open_until"])

                if open_pharmacy.exists():
                    self.stdout.write(self.style.ERROR(
                        f'Pharmacy {pharmacy_datas["name"]} is already open between {pharmacy_datas["open_from"]} and {pharmacy_datas["open_until"]}. Skipped.'))
                    self.n_skipping += 1
                    continue
                # try to open pharmacy at provided date range
                self.perform_pharmacy_opening(pharmacy, pharmacy_datas)
                continue
        except Exception as error:
            # raise CommandError(str(error))
            raise error
        finally:
            self.stdout.write(self.style.SUCCESS(
                f'{self.n_insertions} new pharmacies inserted'))
            self.stdout.write(self.style.SUCCESS(
                f'{self.n_updates} pharmacies updated'))
            self.stdout.write(self.style.SUCCESS(
                f'{self.n_skipping} pharmacies skipped'))
