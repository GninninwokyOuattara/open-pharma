class LinkWithCoordinates:
    shouldContains = ["center", "zoom"]
    def __init__(self, link : str):
        if self.check_format(link):
            self.link = link
        else:
            raise ValueError("Value provided is not an accepted format")
    
    def coordinates(self):
        centerIndex = self.link.index("center")
        zoomIndex = self.link.index("zoom")
        str = self.link[centerIndex+7:zoomIndex-1]
        coordinates = str.split("%2C")
        return {"lat" : coordinates[0], "lng" : coordinates[1]}

    def check_format(self, link):
        contains = True
        for element in self.shouldContains:
            contains = contains & (element in link)
        return contains

        