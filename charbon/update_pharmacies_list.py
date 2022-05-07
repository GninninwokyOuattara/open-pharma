import os
from classes.base_pharmacy import BasePharmacy
from classes.firebase import InitFirebaseConnection
from firebase_admin import db
from constants.constants import FIREBASE_PHARMACIES_LIST

def main():
    # Get pharmacies list from firebase
    ref = db.reference(FIREBASE_PHARMACIES_LIST)
    pharmacies_list : dict = ref.get()
    pharmacies_list_keys = pharmacies_list.keys()


    if not os.path.exists("./pharmacies_list.txt"):
        with open("./pharmacies_list.txt", "w") as file:
            file.write()

    diff = 0
    with open("./pharmacies_list.txt", "r") as file:
        content = file.read()
        content = content.strip().split("\n")
        diff = abs(len(pharmacies_list_keys)- len(content))
        if diff > 0:
            print(f"Found {diff} new pharmacies entry")
    if diff:
        print("Appending new entries to the pharmacies list...")
        #Build pharmacies list
        new_pharmacies_list = ""
        for key in sorted(pharmacies_list):
            pharmacy : BasePharmacy = pharmacies_list[key]
            new_pharmacies_list+= f"{pharmacy['name']}\n"
        with open("./pharmacies_list.txt","w") as file:
            file.write(new_pharmacies_list.strip())
        print("Completed.")
        print(f"Total number of pharmacies : {len(pharmacies_list_keys)}")
        return diff
    else:
        return 0

InitFirebaseConnection()
out = main()
with open("./data.temp", "w") as temp:
    temp.write(str(out))
    