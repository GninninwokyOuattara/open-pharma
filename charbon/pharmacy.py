from unidecode import unidecode

normalMap = {'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A',
             'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'ª': 'A',
             'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
             'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
             'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
             'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
             'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
             'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'º': 'O',
             'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
             'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
             'Ñ': 'N', 'ñ': 'n',
             'Ç': 'C', 'ç': 'c',
             '§': 'S',  '³': '3', '²': '2', '¹': '1'}
normalizer = str.maketrans(normalMap)


class Pharmacy:
    
    stringsToreplace = {"phcie" : "Pharmacie", "(grde)" : ""}

    
    def __init__(self, name : str, supervisor :str , phone_numbers : str, geographical_position : str, google_maps_position_link : str):
        self.name  = self.__sanitize(unidecode(name.lower()))
        self.flat_name = self.name.translate(normalizer)
        self._name = "_".join(self.flat_name.split(" "))
        self.supervisor = unidecode(supervisor.lower())
        self.phone_numbers = "".join(phone_numbers.split(" ")).split("/")
        self.geographical_position = unidecode(geographical_position.lower())
        self.google_maps_position_link = google_maps_position_link
        
    def __sanitize(self, name : str) -> str:
        for key in self.stringsToreplace.keys():
            if key in name:
                name : str = name.replace(key, self.stringsToreplace[key])
        return name.capitalize()
        
