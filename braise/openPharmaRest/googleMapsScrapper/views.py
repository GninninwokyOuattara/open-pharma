
from openPharma.classes.maps_scrapper import GoogleMapsCoordinatesScrapper
from rest_framework.response import Response
from rest_framework.views import APIView


class SearchApiView(APIView):

    http_method_names = ['get']

    def get(self, request, *args, **kwargs):

        name = request.query_params.get("name")
        zone = request.query_params.get("zone")

        if not name or not zone:
            return Response({"error": "name and zone parameter are required."}, status=400)

        maps_scrapper = GoogleMapsCoordinatesScrapper()
        latitude, longitude = maps_scrapper.get_pharmacy_coordinates(
            name=name, zone=zone)

        return Response(
            {"coordinates": {"latitude": latitude, "longitude": longitude}},
            status=200)
