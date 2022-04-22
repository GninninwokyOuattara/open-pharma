class Pharmacy:
    
    def __init__(self, name : str, supervisor :str , phone_numbers : list[str], geographical_position : str, google_maps_position_link : str):
        self.name  = name
        self.supervisor = supervisor
        self.phone_numbers = phone_numbers
        self.geographical_position = geographical_position
        self.google_maps_position_link = google_maps_position_link
