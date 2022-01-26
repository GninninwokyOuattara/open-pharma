import json
from bs4 import BeautifulSoup
from bs4.element import Tag
import requests
import re




from constants.selectors import UBIFARM_NUMPAGE, PHARMA_TABLE, PHARMA_LOCATION
from constants.links import  PHARMA_CONSULT_URL
from pharmacy import OpenPharmacy



class PharmaConsults:
    """"
    Pharma-consult is the website in which we retrieve data related to pharmacies scheduled to be open
    
    url : https://pharma-consults.net/pharmacies-gardes
    """
    url = PHARMA_CONSULT_URL

    
    @classmethod
    def getPageHTMl(self):
        try:
            res = requests.get(self.url)
            if not res.status_code == 200:
                raise
            soup = BeautifulSoup(res.text, "html.parser")
            return soup
        except Exception as ex:
            raise ex
    
    @classmethod
    def getHeaders(self, page : Tag):
        headers = page
    
    @classmethod    
    def getRowDatas(self, table):
        rows = table.select("tbody tr")
        rowsData = []
        for row in rows:
            pharmacy = OpenPharmacy(row)
            rowsData.append(pharmacy)
        return rowsData
        
    @classmethod
    def extractRowsDataFromTables(self, tables):
        tableDatas = {}
        i = 0
        for table in tables:
            rowData = self.getRowDatas(table)
            tableDatas[i] = rowData
            i+=1
        return tableDatas
    
    @classmethod
    def matchHeadersToTableDatas(self, headers, tableDatas):
        """Pair location to datas in a key/value relationship

        Args:
            headers (str): location from pharmaConsult refered to as headers
            tableDatas (Pharmacy | list(Pharmacy)): [The datas that will be paired to the location

        Returns:
            {[key : location ] : Pharmacy | list(Pharmacy)} : The returned oject model
        """
        i = 0
        matched = []
        while i < len(headers):
            headerToPharma = {headers[i] : tableDatas[i]}
            matched.append(headerToPharma)
            i+=1
        return matched
    
    @classmethod
    def addLocationToPharmacy(self, headers, tableDatas):
        updatedTableDatas = []
        i = 0
        while i < len(tableDatas):
            table = tableDatas[i]
            header : str = headers[i]
            pharmacies = []
            for pharmacy  in table:
                pharmacy : OpenPharmacy
                pharmacy.Ville = header.title()
                pharmacy = pharmacy.__dict__
                pharmacies.append(pharmacy)
            updatedTableDatas = [*updatedTableDatas, *pharmacies]
            i+=1
        return updatedTableDatas
                 
    
    @classmethod
    def getOpenPharmacies(self):
        page = self.getPageHTMl()
        headers = [header.get_text(strip=True) for header in page.select(PHARMA_LOCATION)]
        tables = page.select(PHARMA_TABLE)
        tableDatas = PharmaConsults.extractRowsDataFromTables(tables)
        datas = PharmaConsults.addLocationToPharmacy(headers,tableDatas)
        return datas
    
    
