import json
import os
from classes.firebase import InitFirebaseConnection
from firebase_admin import db
from classes.google_maps import GoogleMaps
from constants.constants import PHARMACIES_DATAS_FILE_PATH,PHARMACIES_LIST_FILE_PATH, FIREBASE_PHARMACIES_LIST



InitFirebaseConnection()
if not os.path.exists(PHARMACIES_LIST_FILE_PATH):
    raise BaseException("Pharmacies list file not found")

print("Retrieving pharmacies list from file...")
with open(PHARMACIES_LIST_FILE_PATH, "r") as pharmcies_file:
    pharmacies = pharmcies_file.read().strip().split("\n")
    print(f"Fetching coordinates for {len(pharmacies)} pharmacies")
    links = GoogleMaps.get_meta_links(pharmacies)
    
    if os.path.exists(PHARMACIES_DATAS_FILE_PATH):
        with open(PHARMACIES_DATAS_FILE_PATH, "r") as f:
            print("Pushing datas to firebase...")
            data = json.loads(f.read())
            ref = db.reference("/")
            all = ref.child(FIREBASE_PHARMACIES_LIST).get()
            if all:
                ans = input("It seems like there is already some datas stored on firebase.\nDo you want to overwrite those ? Y/N > ").lower()
                if ans == "y":
                    # ref = db.reference()
                    ref.child(FIREBASE_PHARMACIES_LIST).set(data)
            else:
                ref = db.reference()
                ref.child("all_pharmacies").set(data)
            print("Process completed.")
        

