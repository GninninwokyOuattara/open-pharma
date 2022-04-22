from sqlite3 import Date
from pharmacy import Pharmacy

# class OpenPharmacy(Pharmacy):
    
#     def __init__(self, nom : str, city : str, owner :str , phoneNumber : list[str], geographicalPosition : str, openFrom : Date, openUntil : Date):
#         super().__init__(self, nom, city, owner, phoneNumber, geographicalPosition)
#         self.openFrom = openFrom
#         self.openUntil = openUntil


class OpenPharmacy(Pharmacy):
    
    stringsToRemove = ["(grde)"]
    stringsToreplace = {"phcie" : "Pharmacie", }
    
    def __init__(self, name : str, supervisor : str, phone_numbers : list[str],geographical_position : str, google_maps_position_link : str, open_from : str, open_until : str):
        super().__init__(name,supervisor,phone_numbers, geographical_position, google_maps_position_link)
        self.open_from = open_from
        self.open_until = open_until
        self.sanitize()
    
    
    def sanitize(self):
        for element in self.stringsToRemove:
            if element in self.name.lower():
                self.name = self.name.replace(element, "")
        
        for key in self.stringsToreplace.keys():
            if key in self.name.lower():
                self.name = self.name.replace(key, self.stringsToreplace[key])
        
        self.name = self.name.lower().capitalize()       
        return self
    
    
       