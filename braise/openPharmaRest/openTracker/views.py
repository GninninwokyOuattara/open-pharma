# import requests
import requests
# import BeautifulSoup
from bs4 import BeautifulSoup
from django.shortcuts import render
from openTracker.utils import (extract_pharmacy_data_from_row,
                               get_currently_open_pharmacies_datas)
from rest_framework.response import Response
from rest_framework.views import APIView

SOURCE_URL = "https://pharma-consults.net/pharmacies-gardes"


class CurrentlyOpenPharmaciesView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            open_pharmacies_datas = get_currently_open_pharmacies_datas()
            return Response(open_pharmacies_datas, status=200)
        except Exception as error:
            return Response({"error": str(error)}, status=500)
