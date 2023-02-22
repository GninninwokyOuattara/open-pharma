# import requests
import requests
# import BeautifulSoup
from bs4 import BeautifulSoup
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

maps_url = "https://google.com/maps/search/"
country = "Côte d'Ivoire "


class SearchApiView(APIView):
    def get(self, request, *args, **kwargs):
        # get pharmacy_name parameter
        pharmacy_name = request.query_params.get("pharmacy_name", None)
        # if no pharmacy_name parameter is provided, return error
        if pharmacy_name is None:
            return Response({"error": "pharmacy_name parameter is required."}, status=400)

        # query google maps search api with the provided pharmacy_name
        page = requests.get(maps_url + country + pharmacy_name)

        soup = BeautifulSoup(page.text, "html.parser")
        static_map_meta_tag = soup.find("meta", attrs={"content": lambda x: x and x.startswith(
            "https://maps.google.com/maps/api/staticmap")})
        coordinates = static_map_meta_tag["content"].split("center=")[
            1].split("&")[0]

        latitude, longitude = coordinates.split("%2C")

        verification_link = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"

        return Response({
            "coordinates": {
                "latitude": latitude,
                "longitude": longitude
            },
            "verification_link": verification_link
        }, status=200)
