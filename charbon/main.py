import json
import os
from classes.firebase import InitFirebaseConnection
from firebase_admin import db
from classes.google_maps import GoogleMaps
from classes.pharma_consults import PharmaConsults
from datetime import datetime
from sys import argv


print(argv)
if not argv[1] in ["-fo", "-fa"]:
    raise BaseException("Invalid command option")

if argv[1] == "-fo":

    InitFirebaseConnection()
    print("Fetching currently open pharmacies...")
    currentlyOpenPharmacies = PharmaConsults.getCurrentlyOpenPharmacies()
        
    if argv[2] and argv[2] == "-p":
        if len(currentlyOpenPharmacies)!= 0:
            print("Updating database...")
            try:
                now = datetime.now().timestamp()
                ref = db.reference("/currently_open")
                ref.set(currentlyOpenPharmacies)
                ref = db.reference("/last_update")
                ref.set(now)
            except Exception as e:
                raise e
        

elif argv[1] == "-fa":
    # Fetch all pharmacies coordinates
    from classes.base_pharmacy import BasePharmacy
    with open("./pharmacies.txt", "r") as pharmcies_file:
        pharmacies = pharmcies_file.read().strip().split("\n")
        links = GoogleMaps.get_meta_links(pharmacies)
        
    if argv[2] and argv[2] == "-p":
        if os.path.exists("./cached.json"):
            with open("./cached.json", "r") as f:
                data = json.loads(f.read())
                ref = db.reference("/all")
                all = ref.get()
                if all:
                    ans = input("Overwrite ? Y/N > ").lower()
                    if ans == "y":
                        ref = db.reference()
                        ref.child("all").set(data)
                else:
                    ref = db.reference()
                    ref.child("all_pharmacies").set(data)
            
    





 
    


