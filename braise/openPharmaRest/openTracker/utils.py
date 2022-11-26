import requests
from bs4 import BeautifulSoup
from openTracker.constants import SOURCE_URL


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

    if data["google_maps_link"]:
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

    page = requests.get(SOURCE_URL)
    soup = BeautifulSoup(page.text, "html.parser")
    tables_rows = soup.select("table > tbody > tr")
    return tables_rows


def get_currently_open_pharmacies_datas():
    """Get all pharmacies datas from the source url"""

    tables_rows = get_pharmacies_datas_rows()
    collection = []
    for table_row in tables_rows:
        pharmacy_data = extract_pharmacy_data_from_row(table_row)
        collection.append(pharmacy_data)
    return collection
