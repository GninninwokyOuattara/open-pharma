import json
from classes.firebase import InitFirebaseConnection
from firebase_admin import db
from classes.pharma_consults import PharmaConsults
from datetime import datetime
from pharmacy import Pharmacy

from constants.constants import  FIREBASE_PHARMACIES_LIST, FIREBASE_OPEN_PHARMACIES_ONLY,FIREBASE_OPEN_PHARMA_PHARMACIES_STATES


new = 0
changes = False

# Initialize connection to firebase realtime database
InitFirebaseConnection()

print("Fetching currently open pharmacies...")

#Get all pharmacies currently listed as open from pharmaconsult website
currentlyOpenPharmacies = PharmaConsults.getCurrentlyOpenPharmacies()
print(f"There is {len(currentlyOpenPharmacies.keys())} pharmacies currently open.")    



if len(currentlyOpenPharmacies.keys())!= 0:
    print("Checking for changes...")
    
    #Get keys list for currently open pharmacies fetched from pharmaconsult
    currentlyOpenPharmaciesKeys = sorted(currentlyOpenPharmacies.keys())
    
    #Get keys list for currently open pharmacies fetched from firebase
    ref = db.reference("/")
    currentlyOpenPharmaciesFirebase : dict = ref.child(FIREBASE_OPEN_PHARMACIES_ONLY).get()
    currentlyOpenPharmaciesFirebaseKeys =  sorted(currentlyOpenPharmaciesFirebase.keys())
    
    if currentlyOpenPharmaciesFirebaseKeys != currentlyOpenPharmaciesKeys:
        # What we got from runtime fetch and what is currently on firebase differ, therefore update is required
        changes = True
        print("Changes detected, update required")
        print("Updating firebase data...")
        ref = db.reference("/")
        ref.child(FIREBASE_OPEN_PHARMACIES_ONLY).set(currentlyOpenPharmacies)
        # try:
        #     now = datetime.now().timestamp()
        # except Exception as e:
        #     raise e
    else:
        print("No changes detected, no update will be made to the list of currently open pharmacies.")


# Get the full list of pharmacies from firebase
print("Check for possible update to the phamarcies list...")
all_pharmacies_ref = db.reference("/")
all_pharmacies = all_pharmacies_ref.child(FIREBASE_PHARMACIES_LIST).get()

#From here if we got new item not in the full list then we add them, thus building up the list of pharmacies.
if changes : 
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

# If there is any kind of changes we update the data version on firebase    
if new or changes:
    
    print("Rebuilding main database...")
    all_pharmacies = all_pharmacies_ref.child(FIREBASE_PHARMACIES_LIST).get()

    for key in all_pharmacies:
        pharmacy : Pharmacy
        if key in currentlyOpenPharmacies:
            all_pharmacies[key] = {**all_pharmacies[key], "open" : True}
        else:
            all_pharmacies[key] = {**all_pharmacies[key], "open" : False}
            
    all_pharmacies_ref.child(FIREBASE_OPEN_PHARMA_PHARMACIES_STATES).set(all_pharmacies)
    
    print("Updating data version...")
    now = datetime.now()
    updateCode = f"oph-{now.day}{now.month}{now.year}{now.microsecond}-{len(all_pharmacies.keys())}"
    updateRef = db.reference("/last_update")
    updateRef.set(updateCode)
    
    
    
print("Process completed.")
  
# with open("./open_pharma_datas.json", "w") as f:
#     f.write(json.dumps(all_pharmacies))
    


    
