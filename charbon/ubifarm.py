import asyncio
from datetime import datetime
import os
import json

from bs4 import BeautifulSoup
import re
from bs4.element import Tag
from tqdm import tqdm
import requests
from constants.selectors import PHARMACY_DIRECTOR, PHARMACY_TITLE, UBIFARM_PHARMACY

from constants.selectors import UBIFARM_NUMPAGE, PHARMA_TABLE, PHARMA_LOCATION
from constants.links import  PHARMA_CONSULT_URL


class Ubifarm:
    
    def __init__(self, pharmaConsult : str):
        self.ubifarmUrl = pharmaConsult
        self.pageSoup : BeautifulSoup = self.getPage() 
        # self.page = requests.get(url=ubifarmUrl)
        
    
    def getPage(self):
        try:
            res = requests.get(url=self.ubifarmUrl)
            if not res.status_code == 200:
                raise 
            soup = BeautifulSoup(res.text, "html.parser")
            # self.pageSoup = soup
            return soup
        except Exception as exc:
            raise exc
    
    def getHeaders(self):
        headers = self.pageSoup.select(PHARMA_LOCATION)
        return headers

    def getTablesDatas(self):
        tables = self.pageSoup.select(PHARMA_TABLE)
        return tables
    
    def getTableRowsData(self, table):
        rows = table.select("tbody tr")
        rowsData = []
        for row in rows:
            pharmacy = OpenPharmacy(row)
            pharmacy = pharmacy.getObject()
            rowsData.append(pharmacy)
        return rowsData
            # print(pharmacy)
        
        
    def extractAllTable(self):
        tables = self.pageSoup.select(PHARMA_TABLE)
        result = []
        for table in tables:
            # rows = table.select("tbody tr")
            # for row in rows:
            #     pharmacy = OpenPharmacy(row)
            #     pharmacy = pharmacy.getObject()
            #     print(pharmacy)
            rowsData = self.getTableRowsData(table)
    
    def matchingTableToHeaders(self):
        pass
        
            
        
class OpenPharmacy:
    
    def __init__(self, row : Tag):
        self.name = row.select("td")[0].text
        self.owner = row.select("td")[1].text
        self.contact = row.select("td")[2].text
        self.localisation = row.select("td")[3].text
        self.position = (row.select("td")[4].find("a"))
        if self.position:
            self.position = self.position["href"]
            lat, lng = re.findall(r'\d[.]\d*', self.position)[0:2]
            self.position = f"{lat},{lng}"
        else:
            self.position = ""
        self.start = row.select("td")[5].text
        self.end = row.select("td")[6].text
    
    def getObject(self):
        return { "name" : self.name, "owner" : self.owner, "contact" : self.contact, "localisation" : self.localisation, "position" : self.position, "start" : self.start, "end" : self.end}
            
        
    def __repr__(self) -> str:
       string = "{" + f"name : {self.name}, owner : {self.owner}, contact : {self.contact}, localisation : {self.localisation}, position : {self.position}, start : {self.start}, end : {self.end}" + "}" 
       return string

    
if __name__ == "__main__":
    ubi = Ubifarm(PHARMA_CONSULT_URL)
    ubi.extractAllTable()
    
    
