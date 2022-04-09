from firebase import InitFirebaseConnection
from firebase_admin import db
from pharmaConsults import PharmaConsults
from datetime import datetime

InitFirebaseConnection()

print("Fetching currently open pharmacies...")
currentlyOpenPharmacies = PharmaConsults.getCurrentlyOpenPharmacies()
    
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



