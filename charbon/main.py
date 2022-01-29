
from classes.pharmaConsults import PharmaConsults
from classes.firebaseRest import FirebaseREST

from os import environ




if __name__ == "__main__":
    
    openPharmacyEndpoint = environ.get("OPEN_PHARMACY")
    print("Fetching all currently open pharmacies...")
    data = PharmaConsults.getOpenPharmacies()
    print(f"{len(data)} pharmacies currently open.")
    print("Sending collected data to database...")
    firebase =  FirebaseREST()
    res = firebase.put(openPharmacyEndpoint, data)
    if res.status_code == 200:
        print("Successfully update the list of open pharmacy on firebase ! ")
    else:
        print("Failure to update")
        print(res)