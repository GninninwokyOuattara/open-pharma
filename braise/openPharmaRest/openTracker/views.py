# import requests
import requests
# import BeautifulSoup
from bs4 import BeautifulSoup
from django.shortcuts import render
from openTracker.utils import extract_pharmacy_data_from_row
from rest_framework.response import Response
from rest_framework.views import APIView

SOURCE_URL = "https://pharma-consults.net/pharmacies-gardes"


class CurrentlyOpenPharmaciesView(APIView):

    def get(self, request, *args, **kwargs):
        page = requests.get(SOURCE_URL)
        soup = BeautifulSoup(page.text, "html.parser")
        tables_rows = soup.select("table > tbody > tr")

        collection = []

        for table_row in tables_rows:
            pharmacy_data = extract_pharmacy_data_from_row(table_row)
            collection.append(pharmacy_data)

        return Response(collection, status=200)
