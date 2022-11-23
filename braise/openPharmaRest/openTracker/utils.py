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
    data["phones"] = manager_contacts.split("/")

    geographical_datas_column = row_datas[2].get_text(strip=True).lower()
    google_maps_link = row_datas[2].select_one("a")
    data["google_maps_link"] = google_maps_link["href"] if google_maps_link else ""

    if data["google_maps_link"]:
        data["latitude"], data["longitude"] = data["google_maps_link"].split(
            "@")[1].split(",")[:2]

    addresses = geographical_datas_column.split("position :")[0]
    # Each address is separated by a /
    data["addresses"] = addresses.split("/")

    data["open_from"] = row_datas[4].get_text(strip=True)
    data["open_until"] = row_datas[5].get_text(strip=True)
    return data
