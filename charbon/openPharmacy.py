from sqlite3 import Date
from pharmacy import Pharmacy

# class OpenPharmacy(Pharmacy):
    
#     def __init__(self, nom : str, city : str, owner :str , phoneNumber : list[str], geographicalPosition : str, openFrom : Date, openUntil : Date):
#         super().__init__(self, nom, city, owner, phoneNumber, geographicalPosition)
#         self.openFrom = openFrom
#         self.openUntil = openUntil


class OpenPharmacy:
    
    stringsToRemove = ["(GRDE)"]
    stringsToreplace = {"PHCIE" : "Pharmacie"}
    
    def __init__(self, name : str, open_from : str, open_until : str):
        self.name = name
        self.open_from = open_from
        self.open_util = open_until
        self.sanitize()
    
    
    def sanitize(self):
        for element in self.stringsToRemove:
            if element in self.name:
                self.name = self.name.replace(element, "")
        
        for key in self.stringsToreplace.keys():
            if key in self.name:
                self.name = self.name.replace(key, self.stringsToreplace[key])
        
        self.name = self.name.lower().capitalize()       
        return self
    
    
       