# Main script used to update the database for the following case:
# - Add new pharmacies is not existing
# - Update existing pharmacies by defyning their opening date range
#   - If pharmacies are active


from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from openPharma.classes.logger import ConsoleLogger
from openPharma.classes.pages import PharmaConsultPage
from openPharma.classes.processors import (ActivityManager,
                                           PharmaConsultDataUpdateDBManager,
                                           PharmaConsultPageProcessor)


class Command(BaseCommand):
    help = 'Collects currently open pharmacies on the internet to update the database'

    def handle(self, *args, **options):
        pharmaConsultPage = PharmaConsultPage(
            "https://pharma-consults.net/pharmacies-gardes")
        pageSoup = BeautifulSoup(pharmaConsultPage.get_page(), "html.parser")
        pharmaConsultPP = PharmaConsultPageProcessor(page=pageSoup)
        pharmacies = pharmaConsultPP.get_datas()

        logger = ConsoleLogger()

        pharmacyDBManager = PharmaConsultDataUpdateDBManager(
            pharmacies, logger)
        processing_result = pharmacyDBManager.process_pharmacies()
        ActivityManager.automatic_actualization()
        print("Processing result", processing_result)
