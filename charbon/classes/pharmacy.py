from unidecode import unidecode

from classes.link_with_coordinates import LinkWithCoordinates
from classes.base_pharmacy import BasePharmacy



class Pharmacy(BasePharmacy):

    
    def __init__(self, name : str, supervisor :str = "", phone_numbers : str = "", geographical_position : str = "", google_maps_position_link : str = "", coordinates = {} ,open : bool = False):
        super().__init__(name=name)
        self.supervisor = unidecode(supervisor.lower())
        self.phone_numbers = "".join(phone_numbers.split(" ")).split("/")
        self.geographical_position = unidecode(geographical_position.lower())
        self.google_maps_position_link = google_maps_position_link
        if self.google_maps_position_link:
            self.coordinates = self.___retrieveCoordinates()
        else:
            self.coordinates = coordinates
        self.open = open
        

    def ___retrieveCoordinates(self):
        if self.google_maps_position_link:
            try:
                linkObject = LinkWithCoordinates(self.google_maps_position_link)
                return linkObject.coordinates()
            except Exception as e:
                self.google_maps_position_link = ""
                return None
        


