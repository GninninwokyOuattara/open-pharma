import json
from classes.firebase import InitFirebaseConnection
from firebase_admin import db
from classes.pharma_consults import PharmaConsults
from datetime import datetime
from pharmacy import Pharmacy

from constants.constants import  FIREBASE_PHARMACIES_LIST, FIREBASE_OPEN_PHARMACIES_ONLY,FIREBASE_OPEN_PHARMA_PHARMACIES_STATES


InitFirebaseConnection()
print("Fetching currently open pharmacies...")
currentlyOpenPharmacies = PharmaConsults.getCurrentlyOpenPharmacies()
print(f"There is {len(currentlyOpenPharmacies.keys())} pharmacies currently open.")    
if len(currentlyOpenPharmacies.keys())!= 0:
    print("Updating firebase data...")
    try:
        now = datetime.now().timestamp()
        ref = db.reference("/")
        ref.child(FIREBASE_OPEN_PHARMACIES_ONLY).set(currentlyOpenPharmacies)
        ref = db.reference("/last_update")
        ref.set(now)
    except Exception as e:
        raise e

print("Check for possible update to the phamarcies list...")
all_pharmacies_ref = db.reference("/")
all_pharmacies = all_pharmacies_ref.child(FIREBASE_PHARMACIES_LIST).get()
new = 0
for key in currentlyOpenPharmacies:
    pharmacy : Pharmacy = currentlyOpenPharmacies[key]
    if not pharmacy["_name_safe"] in all_pharmacies:
        all_pharmacies[pharmacy["_name_safe"]] = {"name" : pharmacy["name"], "flat_name" : pharmacy["flat_name"],"_name" : pharmacy["_name"], "_name_safe" : pharmacy["_name_safe"] ,"supervisor" : pharmacy["supervisor"],"phone_numbers" : pharmacy["phone_numbers"],"geographical_position" : pharmacy["geographical_position"], "google_maps_position_link": pharmacy["google_maps_position_link"],   "coordinates" : pharmacy["coordinates"]}
        new+=1
    else :
        item : Pharmacy = all_pharmacies[pharmacy["_name_safe"]]
            
        all_pharmacies[pharmacy["_name_safe"]] = {**item,"supervisor" : pharmacy["supervisor"],"phone_numbers" : pharmacy["phone_numbers"],"geographical_position" : pharmacy["geographical_position"], "google_maps_position_link": pharmacy["google_maps_position_link"],   "coordinates" : pharmacy["coordinates"]}
        
print(f"New pharmacies detected : {new}")
if new > 0:
    print("Applying changes...")
    all_pharmacies_ref.child(FIREBASE_PHARMACIES_LIST).set(all_pharmacies)
    
print("Rebuilding main database...")
all_pharmacies = all_pharmacies_ref.child(FIREBASE_PHARMACIES_LIST).get()


for key in all_pharmacies:
    pharmacy : Pharmacy
    if key in currentlyOpenPharmacies:
        all_pharmacies[key] = {**all_pharmacies[key], "open" : True}
    else:
        all_pharmacies[key] = {**all_pharmacies[key], "open" : False}
        
        
print("Updating...")
    
    
print("Process completed.")
all_pharmacies_ref.child(FIREBASE_OPEN_PHARMA_PHARMACIES_STATES).set(all_pharmacies)
  
with open("./open_pharma_datas.json", "w") as f:
    f.write(json.dumps(all_pharmacies))
    


    
