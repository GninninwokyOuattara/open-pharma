class Pharmacy:
    
    def __init__(self, name : str, lat : float or int, long : float or int, status : bool, owner : str, contact : list[str]):
        self.name = name
        self._lat = lat
        self._long = long
        self._status = status
        self._owner = owner
        self._contact = contact

    @property
    def position(self):
        return (self._lat, self._long)

    def fetchPosition(self):
        raise NotImplementedError
        
        