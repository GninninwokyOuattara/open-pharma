import requests
import os
import json



class FirebaseQuery():
    
    def __init__(self):
        self.PROJECT_URL = os.environ.get("PROJECT_URL")    
        
        if not self.PROJECT_URL:
            raise ValueError("PROJECT_URL is missing in environnement variables")
    
    def post(self, endpoint : str, data : dict):
        try:
            res = requests.post(f"{self.PROJECT_URL}/{endpoint}.json", data = json.dumps(data))
            return res
        except Exception as err:
            raise err
            
    def get(self, endpoint : str):
        try:
            res = requests.get(f"{self.PROJECT_URL}/{endpoint}.json")
            return res
        except Exception as err:
            raise err

        
    