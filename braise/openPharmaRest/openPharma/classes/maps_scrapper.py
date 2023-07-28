

import re

from bs4 import BeautifulSoup, Tag
from openPharma.models import Pharmacy
from requests import get


class PharmacyNotFoundException(Exception):
    pass


class GoogleMapsCoordinatesScrapper:

    BASE_URL = "https://www.google.com/maps/search/"
    PATTERN = r"center=(-?\d+\.\d+)%2C(-?\d+\.\d+)"

    def __init__(self):
        pass

    def _build_query_string(self, name: str, zone: str):
        if not name or not zone:
            raise ValueError("zone or name must be provided")
        zone_name = f"{zone}+{name}"
        return f"{self.BASE_URL}{zone_name}"

    def _get_maps_page(self, url: str):
        page = BeautifulSoup(get(url).text, "html.parser")
        return page

    def _extract_coordinates(self, maps_page_soup: BeautifulSoup):
        all_metas = maps_page_soup.select("meta")
        if len(all_metas) == 0:
            raise PharmacyNotFoundException(
                "Impossible to find the current pharmacy on maps.")
        for meta in all_metas:
            if "maps.google" in meta["content"] and not isinstance(meta["content"], list):
                meta_with_maps_content = str(meta["content"])
                match = re.search(self.PATTERN, meta_with_maps_content)
                if match:
                    return float(match.group(1)),  float(match.group(2))
                break
        raise ValueError("Unable to find coordinates")

    def get_coordinates_from_name(self, name: str, zone: str):
        """
        Retrieves the coordinates for a given name and zone.

        Args:
            name (str): The name to search for.
            zone (str): The zone to search within.

        Returns:
            tuple: A tuple containing the latitude and longitude coordinates corresponding to the given name and zone.
        """
        query = self._build_query_string(name, zone)
        page = self._get_maps_page(query)
        coordinates = self._extract_coordinates(page)
        print(coordinates)
        return coordinates
