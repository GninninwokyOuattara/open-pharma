import requests
from bs4 import BeautifulSoup
from django.utils import timezone

from openPharma.models import OpenPharmacy, Pharmacy
from openTracker.constants import REQUEST_HEADERS, SOURCE_URL

# Checkers


def is_valid_maps_link(link):
    if "maps" in link:
        return True


def extract_pharmacy_data_from_row(row):
    """Given a row from the source url, extract revelant data at each indexes
    and return a dictionary with the data"""

    data = {}
    row_datas = row.select("td")
    data["name"] = row_datas[0].get_text(strip=True).lower()

    manager_column = row_datas[1].get_text(strip=True).lower()
    # Manager cell cointains the name of the manager and the phones numbers
    # separated by 'Contact :'
    manager_name, manager_contacts = manager_column.split("contact :")
    data["director"] = manager_name.strip()
    data["phones"] = manager_contacts.replace(
        " ", "").replace("+225", "").split("/")

    geographical_datas_column = row_datas[2].get_text(strip=True).lower()
    google_maps_link = row_datas[2].select_one("a")
    data["google_maps_link"] = google_maps_link["href"] if google_maps_link else ""

    # if data["name"]:
    #     print(data["name"])
    #     print(geographical_datas_column)
    #     print(data["google_maps_link"])

    if is_valid_maps_link(data["google_maps_link"]):
        if "maps.apple.com" in data["google_maps_link"]:
            latitude, longitude = data["google_maps_link"].split("=")[
                1].split("&")[0].split(",")
            data["latitude"] = float(latitude)
            data["longitude"] = float(longitude)

        else:
            latitude, longitude = data["google_maps_link"].split(
                "@")[1].split(",")[:2]
            data["latitude"] = float(latitude)
            data["longitude"] = float(longitude)

    else:
        data["latitude"] = 0
        data["longitude"] = 0

    addresses = geographical_datas_column.split("position :")[0]
    # Each address is separated by a /
    data["addresses"] = addresses.split("/")

    data["open_from"] = row_datas[4].get_text(strip=True)
    data["open_until"] = row_datas[5].get_text(strip=True)
    return data


# PHARMA CONSULT

def get_pharmacies_datas_rows():
    """Get the table rows containing pharmacies data from the source url"""

    page = requests.get(SOURCE_URL, headers=REQUEST_HEADERS
                        )
    soup = BeautifulSoup(page.text, "html.parser")
    tables_rows = soup.select("table > tbody > tr")
    return tables_rows


def perform_get_currently_open_pharmacies_datas():
    """Run get_currently_open_pharmacies_datas function while also keeping track of its performance and handling printing informations in console.
    """

    # get the timestamp
    start = timezone.now()
    pharmacies_datas = get_currently_open_pharmacies_datas()
    end = timezone.now()
    # duration in sec
    duration = (end - start).total_seconds()

    return pharmacies_datas


def get_currently_open_pharmacies_datas():
    """Get all pharmacies datas from the source url"""

    tables_rows = get_pharmacies_datas_rows()
    collection = []
    for table_row in tables_rows:
        pharmacy_data = extract_pharmacy_data_from_row(table_row)
        collection.append(pharmacy_data)
    return collection


#

def perform_pharmacy_insertion(self, pharmacy_datas):
    """Perform a regular pharmacy insertion while handling possible error and printing

    Args:
        pharmacy_datas (__dict__): An object of key value pair representing a pharmacy
    """
    try:
        # Pharmacy.objects.create(
        #     **pharmacy_datas, pending_review=True, active=False)
        Pharmacy.objects.create(
            name=pharmacy_datas["name"],
            director=pharmacy_datas["director"],
            addresses=pharmacy_datas["addresses"],
            phones=pharmacy_datas["phones"],
            google_maps_link=pharmacy_datas["google_maps_link"],
            latitude=pharmacy_datas["latitude"],
            longitude=pharmacy_datas["longitude"],
            pending_review=True,
            active=False)

        self.stdout.write(self.style.SUCCESS(
            f'[{self.timestamp}] {pharmacy_datas["name"]} created and pending review'))
        self.n_insertions += 1
    except Exception as err:
        # TODO handle exception.
        pass


def perform_pharmacy_opening(self, pharmacy, pharmacy_datas):
    """Perform the act of opening the pharmacy on a date range.

    Args:
        pharmacy (Pharmacy): A pharmacy open 
    """
    try:
        OpenPharmacy.objects.create(
            pharmacy=pharmacy, open_from=pharmacy_datas["open_from"], open_until=pharmacy_datas["open_until"])
        self.stdout.write(self.style.SUCCESS(
            f'[{self.timestamp}] {pharmacy_datas["name"]} opening data has been set.'))
        self.n_updates += 1
    except Exception as err:
        # TODO Better handling of this exception...
        self.stdout.write(self.style.ERROR(
            f'[{self.timestamp}] {pharmacy_datas["name"]} opening data has not been set due to an unknown error.'))
        pass


def stdout_stamp(self, message):
    """Print a message with a timestamp

    Args:
        message (str): The message to print
    """
    self.stdout.write(self.style.SUCCESS(
        f'[{self.timestamp}] {message}'))
