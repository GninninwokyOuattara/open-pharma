from datetime import datetime
from typing import List, Tuple

from bs4 import ResultSet, Tag
from openPharma.classes.datas import PharmaConsultPharmacy, Pharmacy
from openPharma.classes.logger import ProcessingLogger
from openPharma.interfaces.processors import PageProcessor
from openPharma.models import OpenPharmacy as OpenPharmacyModel
from openPharma.models import Pharmacy as PharmacyModel


class PharmaConsultDataGetter:

    DATE_INPUT_FORMAT = "%d/%m/%Y"
    DATE_OUTPUT_FORMAT = "%Y-%m-%d"

    def __init__(self, row: Tag):
        self.row = row

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
                elif "/maps/" in link:
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
        open_from = datetime.strptime(row_data[4].get_text(strip=True),
                                      self.DATE_INPUT_FORMAT).strftime(self.DATE_OUTPUT_FORMAT)
        open_until = datetime.strptime(row_data[5].get_text(strip=True),
                                       self.DATE_INPUT_FORMAT).strftime(self.DATE_OUTPUT_FORMAT)

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
        # data["zone"] = self.header.lower()
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
        return table.select("tbody > tr")

    def _get_headers_element(self) -> List[Tag]:
        return self.page.select("div.alert.alert-light.alert-elevate")

    def _get_header_from_header_element(self, header_element: Tag) -> str:
        header = header_element.select_one("h5")
        if header != None:
            return header.get_text(strip=True)
        raise Exception("No header found")

    def _get_table_associated_to_header(self, header_element: Tag) -> Tag:
        table = header_element.find_next_sibling("table")
        if isinstance(table, Tag):
            return table
        raise Exception("No table found")

    def get_datas(self):
        headers_elements = self._get_headers_element()
        all_pharmacies = []

        for header_element in headers_elements:
            header = self._get_header_from_header_element(header_element)
            table = self._get_table_associated_to_header(header_element)
            table_rows = self._get_rows(table)

            pharmacies = [PharmaConsultDataGetter(
                row).get_pharmacy_data_from_row() for row in table_rows]

            # Add header to all those pharmacies
            for pharmacy in pharmacies:
                pharmacy.zone = header

            all_pharmacies.extend(pharmacies)

        return all_pharmacies


class PharmaConsultDataUpdateDBManager:
    """Manage the insertion, opening of pharmacies inside the database
    """
    inserted_pharmacies = 0
    opened_pharmacies = 0
    skipped_pharmacies = 0
    already_opened_pharmacies = 0

    def __init__(self, pharmacies: List[PharmaConsultPharmacy], logger: ProcessingLogger):
        self.pharmacies = pharmacies
        self.logger = logger

    def find_pharmacy_by_name_and_zone(self, pharmacy: Pharmacy):

        pharmacy_found = PharmacyModel.objects.filter(
            name=pharmacy.name, zone=pharmacy.zone)
        if pharmacy_found:
            return pharmacy_found[0]
        return None

    def is_pharmacy_opened_on_date_range(self, pharmacy, open_from: str, open_until: str):
        open_pharmacies = OpenPharmacyModel.objects.filter(
            pharmacy=pharmacy, open_from__lte=open_from, open_until__gte=open_until)
        if open_pharmacies:
            return True
        return False

    def insert_pharmacy(self, pharmacy: Pharmacy):
        try:
            return PharmacyModel.objects.create(
                name=pharmacy.name,
                zone=pharmacy.zone,
                director=pharmacy.director,
                addresses=pharmacy.addresses,
                phones=pharmacy.phones,
                google_maps_link=pharmacy.google_maps_link,
                latitude=pharmacy.latitude,
                longitude=pharmacy.longitude,

                pending_review=True,
                active=False)
        except Exception as e:
            raise e

    def open_pharmacy(self, pharmacy, open_from: str, open_until: str):
        try:
            OpenPharmacyModel.objects.create(
                pharmacy=pharmacy, open_from=open_from, open_until=open_until)
            # print("BIM opened", pharmacy.name)
        except Exception as e:
            raise e
        pass

    def process_single_pharmacy(self, pharmacy):
        """
        Process a single pharmacy.

        Parameters:
        - pharmacy: The pharmacy object to be processed.

        Returns:
        None
        """
        existing_pharmacy = self.find_pharmacy_by_name_and_zone(pharmacy)
        if not existing_pharmacy:
            existing_pharmacy = self.insert_pharmacy(pharmacy)

            self.inserted_pharmacies += 1
            self.logger.info(f"{pharmacy.name} has been inserted")

        if not pharmacy.open_from or not pharmacy.open_until:
            # No information on opening dates, skip
            return

        if self.is_pharmacy_opened_on_date_range(
                existing_pharmacy,
                pharmacy.open_from,
                pharmacy.open_until):
            self.already_opened_pharmacies += 1
            self.logger.warning(f"{pharmacy.name} already opened")

        else:
            self.open_pharmacy(
                existing_pharmacy,
                pharmacy.open_from,
                pharmacy.open_until)
            self.opened_pharmacies += 1
            self.logger.success(
                f"{pharmacy.name} opened from {pharmacy.open_from} to {pharmacy.open_until}")

    def process_pharmacies(self):
        print(f"Processing {len(self.pharmacies)} pharmacies...")
        for pharmacy in self.pharmacies:
            self.process_single_pharmacy(pharmacy)

        process_result = {
            "inserted_pharmacies": self.inserted_pharmacies,
            "opened_pharmacies": self.opened_pharmacies,
            "already_opened_pharmacies": self.already_opened_pharmacies
        }
        return process_result

# class ProcessingLogger():
#     def __init__(self, stdout : , style):
#         self.stdout = stdout
#         self.style = style
