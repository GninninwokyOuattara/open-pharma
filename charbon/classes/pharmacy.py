class Pharmacie:
    
    def __init__(self, name : str, lat : float or int, long : float or int, status : bool, owner : str, contact : list[str], geographical_position : str):
        self.name = name
        self._lat = lat
        self._long = long
        self._status = status
        self._owner = owner
        self._contact = contact
        self._geographical_position = geographical_position

    @property
    def position(self):
        return (self._lat, self._long)
        
        