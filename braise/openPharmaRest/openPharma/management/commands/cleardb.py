# clear database command
# Path: openPharmaRest/openPharma/management/commands/cleardb.py
import random

from django.core.management.base import BaseCommand, CommandError
# import pharmact
from openPharma.models import OpenPharmacy, Pharmacy


class Command(BaseCommand):
    help = 'Clear database'

    def handle(self, *args, **options):
        # Delete all pharmacies
        Pharmacy.objects.all().delete()

        self.stdout.write(self.style.SUCCESS(
            'Successfully cleared database'))
