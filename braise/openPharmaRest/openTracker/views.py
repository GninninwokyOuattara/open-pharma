# import requests
import requests
# import BeautifulSoup
from bs4 import BeautifulSoup
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from openTracker.utils import (extract_pharmacy_data_from_row,
                               get_currently_open_pharmacies_datas)

SOURCE_URL = "https://pharma-consults.net/pharmacies-gardes"


class CurrentlyOpenPharmaciesView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            open_pharmacies_datas = get_currently_open_pharmacies_datas()
            return Response(open_pharmacies_datas, status=200)
        except Exception as error:
            return Response({"error": str(error)}, status=500)


class OpenPharmaActualizerView(APIView):

    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello world!"}, status=200)
