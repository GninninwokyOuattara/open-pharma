
import random
from datetime import datetime

from django.core.management.base import BaseCommand, CommandError
# import pharmact
from openPharma.models import OpenPharmacy, Pharmacy
from openTracker.utils import get_currently_open_pharmacies_datas


class Command(BaseCommand):
    help = 'Collects currently open pharmacies on the internet to update the database'

    def handle(self, *args, **options):
        try:
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
        except Exception as error:
            raise CommandError(str(error))
