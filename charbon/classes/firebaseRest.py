
import json
import requests
import os


import pyperclip



class FirebaseREST():
    
    def __init__(self):
        self.project_url = os.environ.get("PROJECT_URL")
        
        if not self.project_url:
            raise TypeError
        
        self.all_pharmacy_url = os.environ.get("ALL_PHARMACY")
        self.open_pharmacy_url = os.environ.get("OPEN_PHARMACY")

    
    def sanitizeData(self, data):
        return json.dumps(data)


            
    
    # def post(self, data):
    #     data = self.sanitizeData(data)
    #     res = requests.post(self.project_url, data)
    #     return res
    #     pass
    
    def get(self, endpoint : str):
        """Fetch data from a firebase endpoint

        Args:
            endpoint (str): [description]

        Raises:
            e: [description]

        Returns:
            [type]: [description]
        """
        res : requests.Response
        try:
            res = requests.get(f"{self.project_url}/{endpoint}.json")
            return res
        except Exception as e:
            raise e
    
    def put(self, endpoint, data):
        """Use to replace data from a firebase endpoint with new data

        Args:
            endpoint ([type]): [description]
            data ([type]): [description]

        Raises:
            e: [description]

        Returns:
            [type]: Response
        """
        data = self.sanitizeData(data)
        pyperclip.copy(data)
        res : requests.Response
        try:     
            res = requests.put(f"{self.project_url}/{endpoint}.json", data)
            return res
        except Exception as e:
            raise e
        
    def delete(self):
        """Remove endpoint containing all currently open pharmacy"""
        res : requests.Response
        try:
            res = requests.delete(f"{self.project_url}/{self.open_pharmacy_url}.json")
        except Exception as e:
            raise e
    
        