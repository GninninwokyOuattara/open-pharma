class Pharmacy:
    
    def __init__(self, nom : str, supervisor :str , phoneNumbers : list[str], geographicalPosition : str, googleMapsPositionLink : str):
        self.nom  = nom
        self.supervisor = supervisor
        self.phoneNumbers = phoneNumbers
        self.geographicalPosition = geographicalPosition
        self.googleMapsPositionLink = googleMapsPositionLink
