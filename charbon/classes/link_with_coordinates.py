import re



class LinkWithCoordinates:
    """Extract coordinates from provided link if supported
    """
    _shouldContains = ["center", "zoom"]
    _link_types_match = {
        "meta_link" : 
            r"^https://maps.google.*center={1}(-?[0-9]\d*\.\d+)%2C(-?[0-9]\d*\.\d+).*zoom",
        "google_maps_link" : 
            r"^https:\/\/www.google.*\/maps\/place\/.*@{1}(-?[0-9]\d*\.\d+),{1}(-?[0-9]\d*\.\d+).*data.*"
}
    def __init__(self, link : str):
        self.__link_type = None
        if self.check_format(link):
            self.link = link
        else:
            print(link)
            raise ValueError("Provided link is not of a valid structure")
    
    def coordinates(self):
        """Return coordinates from provided link

        Returns:
            dict : a dictinnary of coordinates with lat and lng as keys
        """
        matched_coordinates = re.match(self._link_types_match[self.__link_type], self.link)
        [lat, lng] = matched_coordinates.groups()
        return {"lat": lat, "lng" : lng}

    def check_format(self, link):
        """Valide provided link format

        Args:
            link (str): provided link

        Returns:
            bool: True if valid otherwise False
        """
        if re.match(self._link_types_match["meta_link"], link):
            self.__link_type = "meta_link"
            return True
        elif re.match(self._link_types_match["google_maps_link"], link):
            self.__link_type = "google_maps_link"
            return True
        return False

        