
import json
import requests
import os


import pyperclip

class FirebaseREST():
    
    def __init__(self, projectUrl):
        self.project_url = projectUrl

    
    def sanitizeData(self, data):
        return json.dumps(data)
            
    
    def post(self, data):
        data = self.sanitizeData(data)
        res = requests.post(self.project_url, data)
        return res
        pass
    
    def get(self):
        res = requests.get(self.project_url)
        return res
    
    def put(self, data):
        data = self.sanitizeData(data)
        pyperclip.copy(data)
        res = requests.put(self.project_url, data)
        return res