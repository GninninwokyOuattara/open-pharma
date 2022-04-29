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



class BasePharmacy:
    stringsToreplace = {"phcie" : "pharmacie", "(grde)" : "", "(nvlle)" : "", "(gde)" : "", "(nlle)" : "", "(grande)" : "", "(nouvelle)" : "", "ii" : "2", "iii" : "3"}

    
    def __init__(self, name : str):
        self.name  = self.__sanitize(unidecode(name.lower()))
        self.flat_name = self.name.translate(normalizer)
        self._name = "_".join(self.flat_name.split(" "))
        self._name_safe = self._name.replace(".", "")
        
    def __sanitize(self, name : str) -> str:
        out_name = name
        for key in self.stringsToreplace.keys():
            if key in name:
                out_name : str = out_name.replace(key, self.stringsToreplace[key])
        return out_name
    