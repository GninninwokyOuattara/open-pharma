
from classes.pharmaConsults import PharmaConsults
from classes.firebaseRest import FirebaseREST




if __name__ == "__main__":
    
    
    data = PharmaConsults.getOpenPharmacies()
    firebase =  FirebaseREST()
    res = firebase.put(data)
    if res.status_code == 200:
        print("Successfully update the list of open pharmacy on firebase ! ")
    else:
        print("Failure to update")