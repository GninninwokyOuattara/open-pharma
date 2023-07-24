from typing import List, Tuple

from bs4 import ResultSet, Tag
from classes.datas import PharmaConsultPharmacy, Pharmacy
from interfaces.processors import PageProcessor
from models import OpenPharmacy as OpenPharmacyModel
from models import Pharmacy as PharmacyModel


class PharmaConsultDataGetter:
    def __init__(self, row: Tag, header: str):
        self.row = row
        self.header = header

    def _get_coordinates(self, row_data: ResultSet[Tag]) -> Tuple[float, float] | None:
        try:
            google_maps_link = row_data[2].select_one("a")
            link: str = ""
            if google_maps_link != None:
                link = str(google_maps_link["href"])

                if "maps.apple.com" in link:
                    latitude, longitude = link.split("=")[
                        1].split("&")[0].split(",")
                    return (float(latitude), float(longitude))
                elif "www.google.com/maps" in link:
                    latitude, longitude = link.split(
                        "@")[1].split(",")[:2]
                    return (float(latitude), float(longitude))
            return None

        except Exception as e:
            raise e

    def _get_addresses(self, row_data: ResultSet[Tag]) -> List[str]:

        addresses_datas = row_data[2].get_text(strip=True).lower()
        addresses = addresses_datas.split("position :")[0].split("/")
        return addresses

    def _get_director(self, row_data: ResultSet[Tag]) -> str:
        column_data = row_data[1].get_text(strip=True).lower()
        director = column_data.split("contact :")[0]
        return director

    def _get_phones(self, row_data: ResultSet[Tag]) -> List[str]:
        column_data = row_data[1].get_text(strip=True).lower()
        phones_datas = column_data.split("contact :")[1]
        phones = phones_datas.replace(
            " ", "").replace("+225", "").split("/")

        return phones

    def _get_openings_dates(self, row_data: ResultSet[Tag]):
        open_from = row_data[4].get_text(strip=True)
        open_until = row_data[5].get_text(strip=True)
        # convert them into date object of year month day
        return (open_from, open_until)

    def _get_google_maps_link(self, row_data: ResultSet[Tag]) -> str:
        google_maps_link = row_data[2].select_one("a")
        if google_maps_link != None:
            return str(google_maps_link["href"])
        return ""

    def get_pharmacy_data_from_row(self) -> Pharmacy:
        data = {}
        row_datas = self.row.select("td")
        data["zone"] = self.header.lower()
        data["name"] = row_datas[0].get_text(strip=True).lower()
        data["director"] = self._get_director(row_datas)
        data["open_from"], data["open_until"] = self._get_openings_dates(
            row_datas)
        data["addresses"] = self._get_addresses(row_datas)
        data["phones"] = self._get_phones(row_datas)
        data["google_maps_link"] = self._get_google_maps_link(row_datas)
        coordinates = self._get_coordinates(row_datas)
        if coordinates:
            data["latitude"], data["longitude"] = coordinates

        return PharmaConsultPharmacy(**data)


class PharmaConsultPageProcessor(PageProcessor):

    def __init__(self, page: Tag):
        self.page = page

    def _get_rows(self, table: Tag) -> List[Tag]:
        return self.page.select("table > tbody > tr")

    def _get_headers_element(self) -> List[Tag]:
        # select a div with class alert alert-light alert-elevate
        return self.page.select("div.alert.alert-light.alert-elevate")

    def _get_header_from_header_element(self, header_element: Tag) -> str:
        header = header_element.select_one("h5")
        if header != None:
            return header.get_text(strip=True)
        raise Exception("No header found")

    def _get_table_allocated_to_header(self, header_element: Tag) -> Tag:
        table = header_element.find_next_sibling("table")
        if isinstance(table, Tag):
            return table
        raise Exception("No table found")

    def get_datas(self):
        headers_elements = self._get_headers_element()
        all_pharmacies = []

        for header_element in headers_elements:
            header = self._get_header_from_header_element(header_element)
            table = self._get_table_allocated_to_header(header_element)
            table_rows = self._get_rows(table)
            pharmacies = list(map(
                lambda row: PharmaConsultDataGetter(row, header=header).get_pharmacy_data_from_row(), table_rows))
            all_pharmacies.extend(pharmacies)

        return all_pharmacies


class PharmacyDBManager:
    """Manage the insertion, opening of pharmacies inside the database
    """

    def __init__(self, pharmacies: List[Pharmacy]):
        self.pharmacy = pharmacies
        self.pharmacy_model = PharmacyModel
        self.open_pharmacy_model = OpenPharmacyModel

    def find_pharmacy(self, pharmacy: Pharmacy):
        # self.pharmacy_model.objects.filter(
        # name=pharmacy.name, latitude=pharmacy.latitude, longitude=pharmacy.longitude)
        pass

    def insert_pharmacy(self, pharmacy: Pharmacy):
        pass

    def open_pharmacy(self, pharmacy: Pharmacy):
        pass

    def process_pharmacies(self):
        print("Processing pharmacies...")
        pass

# class ProcessingLogger():
#     def __init__(self, stdout : , style):
#         self.stdout = stdout
#         self.style = style
