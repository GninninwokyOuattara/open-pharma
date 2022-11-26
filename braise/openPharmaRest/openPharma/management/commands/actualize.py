# Main script used to update the database for the following case:
# - Add new pharmacies is not existing
# - Update existing pharmacies by defyning their opening date range
#   - If pharmacies are active


import json

from django.core.management.base import BaseCommand, CommandError
# from timezone import timezone
from django.utils import timezone
# import pharmact
from openPharma.models import OpenPharmacy, Pharmacy
from openTracker.models import TrackerHistory
from openTracker.utils import get_currently_open_pharmacies_datas


class Command(BaseCommand):
    help = 'Collects currently open pharmacies on the internet to update the database'

    start_time = timezone.now()
    end_time = None

    n_insertions = 0
    n_updates = 0
    n_skipped_already_open = 0
    n_skipped_inactive = 0

    pharmacies_datas = None

    @property
    def timestamp(self):
        """Get the current timestamp

        Returns:
            str: The current timestamp
        """
        return timezone.now().strftime("%d/%m/%Y %H:%M:%S:%f")

    def stdout_stamp(self, message):
        """Print a message with a timestamp

        Args:
            message (str): The message to print
        """
        self.stdout.write(self.style.SUCCESS(
            f'[{self.timestamp}] {message}'))

    def perform_get_currently_open_pharmacies_datas(self):
        """Run get_currently_open_pharmacies_datas function while also keeping track of its performance and handling printing informations in console.
        """
        print(
            f"[{self.timestamp}] Collecting currently open pharmacies. Please wait...")
        # get the timestamp
        start = timezone.now()
        self.pharmacies_datas = get_currently_open_pharmacies_datas()
        end = timezone.now()
        # duration in sec
        duration = (end - start).total_seconds()
        self.stdout.write(self.style.SUCCESS(
            f"[{self.timestamp}] Fetch completed in {duration} seconds"))
        self.stdout.write(self.style.SUCCESS(
            f'[{self.timestamp}] There is currently {len(self.pharmacies_datas)} open pharmacies'))

        return self.pharmacies_datas

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
                f'[{self.timestamp}] Pharmacy {pharmacy_datas["name"]} created and pending review'))
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
                f'[{self.timestamp}] Pharmacy {pharmacy_datas["name"]} opening data has been set.'))
            self.n_updates += 1
        except Exception as err:
            # TODO Better handling of this exception...
            self.stdout.write(self.style.ERROR(
                f'[{self.timestamp}] Pharmacy {pharmacy_datas["name"]} opening data has not been set due to an unknown error.'))
            pass

    def handle(self, *args, **options):
        try:
            self.pharmacies_datas = self.perform_get_currently_open_pharmacies_datas()
            for pharmacy_datas in self.pharmacies_datas:
                # Look for the pharmacy in the db
                pharmacy = Pharmacy.objects.filter(
                    name=pharmacy_datas["name"], latitude=pharmacy_datas["latitude"], longitude=pharmacy_datas["longitude"])
                if not pharmacy.exists():
                    # Doesn't exist, insert new ones as pending_review by admin
                    self.perform_pharmacy_insertion(pharmacy_datas)
                    continue

                pharmacy = pharmacy[0]

                if not pharmacy.active:
                    # Pharmacy is not active, skip
                    self.stdout.write(self.style.WARNING(
                        f'[{self.timestamp}] Pharmacy {pharmacy_datas["name"]} is not active.'))
                    self.n_skipped_inactive += 1
                    continue

                pharmacy_datas["open_from"] = timezone.strptime(
                    pharmacy_datas["open_from"], '%d/%m/%Y')
                pharmacy_datas["open_until"] = timezone.strptime(
                    pharmacy_datas["open_until"], '%d/%m/%Y')

                open_pharmacy = OpenPharmacy.objects.filter(
                    pharmacy=pharmacy, open_from__lte=pharmacy_datas["open_from"],
                    open_until__gte=pharmacy_datas["open_until"])

                if open_pharmacy.exists():
                    self.stdout.write(self.style.ERROR(
                        f'[{self.timestamp}] {pharmacy_datas["name"]} is already open between {pharmacy_datas["open_from"]} and {pharmacy_datas["open_until"]}. Skipped.'))
                    self.n_skipped_already_open += 1
                    continue

                # try to open pharmacy at provided date range
                self.perform_pharmacy_opening(pharmacy, pharmacy_datas)
                continue
        except Exception as error:
            # raise CommandError(str(error))
            raise error
        finally:
            # Summary of the task
            print(f"[{self.timestamp}] ======= SUMMARY =======")
            self.stdout.write(self.style.SUCCESS(
                f'[{self.timestamp}] {self.n_insertions} new pharmacies inserted'))
            self.stdout.write(self.style.SUCCESS(
                f'[{self.timestamp}] {self.n_updates} pharmacies updated'))
            self.stdout.write(self.style.WARNING(
                f'[{self.timestamp}] {self.n_skipped_already_open} pharmacies already open at provided date range'))
            self.stdout.write(self.style.WARNING(
                f'[{self.timestamp}] {self.n_skipped_inactive} pharmacies skipped due to inactivity'))

            self.end_time = timezone.now()
            self.duration = (self.end_time - self.start_time)
            # print total duration
            print(
                f"[{self.timestamp}] Job execution duration: {self.duration}")
            # convert self.pharmacies_datas to json

            # insert in TrackerHistory
            TrackerHistory.objects.create(
                start_time=self.start_time, end_time=self.end_time, duration=self.duration, mode="scheduled", collected_data=json.dumps(self.pharmacies_datas))
