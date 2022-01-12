from firebaseRest import FirebaseQuery
import json
import os

fq = FirebaseQuery()

if os.path.exists("./pharmacies_with_coordinates_save.json"):
    print("Loading json data...")
    dataJson = None
    with open("./pharmacies_with_coordinates_save.json", "r") as f:
        dataJson = json.loads(f.read())
    print("Sending data to firebase...")
    res = fq.post("/pharmacies", data=dataJson)
    if res.status_code == 200:
        print("Done ! ")
    else:
        print(res.text)
else:
    print("Missing data")
