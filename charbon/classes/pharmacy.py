import json
import re
from bs4.element import Tag

class OpenPharmacy:
    
    def __init__(self, row : Tag):
        self.Nom = row.select("td")[0].text.title()
        self.Dirigeant = row.select("td")[1].text.title()
        self.Numero = row.select("td")[2].text
        self.Localisation : str = row.select("td")[3].text.title()
        self.Ville = ""
        self.Position = (row.select("td")[4].find("a"))
        if self.Position:
            self.Position = self.Position["href"]
            lat, lng = re.findall(r'\d[.]\d*', self.Position)[0:2]
            self.Position = f"{lat},{lng}"
        else:
            self.position = ""
        self.Start = row.select("td")[5].text
        self.End = row.select("td")[6].text
        self.formalize()
    

    def formalize(self):
        self.Nom = self.Nom.replace("Phcie", "Pharmacie")
        self.Ville = self.Ville.title()

    
    def getObject(self):
        return { "Nom" : self.Nom, "Dirigeant" : self.Dirigeant, "Numero" : self.Numero, "Localisation" : self.Localisation, "Position" : self.Position, "Start" : self.Start, "End" : self.End}
    
    def toJson(self):
        return json.dumps(self.__dict__)
            
        
    # def __repr__(self) -> str:
    #    string = "{" + f"Nom : {self.Nom}, Dirigeant : {self.Dirigeant}, Numero : {self.Numero}, Localisation : {self.Localisation}, Ville : {self.Ville}, Position : {self.Position}, Start : {self.Start}, End : {self.End}" + "}" 
    #    return string
    
    def __repr__(self) -> dict:
        return str(self.__dict__)