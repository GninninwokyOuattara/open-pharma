from selenium import webdriver
from selenium.webdriver.chrome import service
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

# import aiohttp
# import asyncio
# import json
import urllib
import re
import pandas as pd 
import os
# from bs4 import BeautifulSoup

class Scrapper:
    def __init__(self, filePath):
        self.driver = None
        self._mapUrl = "https://google.com/maps/search/"
        self._filePath = filePath
        self.parsedFile = None
        self.outputFileName = "./pharmacies_with_coordinates"
        # self.tqdmParsedFile : tqdm = None
        self.datas = []
        self.failure = 0
        if not self.loadPreviousFile():
            self.parseFile()
        
    def saveToExcel(self):
        """Save the data frame to an excel format"""
        self.parsedFile.to_excel(f"./{self.outputFileName}.xlsx", sheet_name='Sheet_name_1', index= False)
        print(f"Saved in {self.outputFileName}.xlsx")
    
    def saveToJson(self):
        """Save the dataframe to JSON format"""
        self.parsedFile.to_json(f"{self.outputFileName}.json")
        print(f"Save in {self.outputFileName}.json")
        
    def queryRefactor(self, ville : str, commune : str, pharmacy : str):
        """Make sure the query comport a most one mention of the 'commune' """
        if commune != commune : 
            commune = False
            ville = ville.lower()
        else : 
            commune = commune.lower()
        pharmacy = pharmacy.lower()
        
        
   
        if commune and commune in pharmacy:
            pharmacy : list[str] = pharmacy.split(" ")
            try:
                pharmacy.remove(commune)
                pharmacy = " ".join(pharmacy).strip()
                return commune + " " + pharmacy
            except ValueError as err:
                pharmacy = " ".join(pharmacy).strip()
                return pharmacy
        else :
            return (commune if commune else ville) + " " +pharmacy
                
        
        
    def parseFile(self):
        """Parse excel file to dataframe"""
        if not os.path.exists(self._filePath):
            return FileNotFoundError
        try:
            self.parsedFile = pd.read_excel(self._filePath)
        except Exception as e:
            raise e 

        
    def loadPreviousFile(self):
        if os.path.exists(f"./{self.outputFileName}.xlsx"):
            self.parsedFile = pd.read_excel(f"./{self.outputFileName}.xlsx")
            print("Previous save found, Restarting process")
            return True
        else:
            print("No previous file has been found. Starting anew")
            return False

    def initDriver(self):
        "Initialize webdriver"
        serv = Service("./chromedriver")
        options = webdriver.ChromeOptions()
        # options.add_experimental_option('excludeSwitches', ['enable-logging'])
        caps = DesiredCapabilities().CHROME
        caps["pageLoadStrategy"] = "none"
        self.driver = webdriver.Chrome(options=options, service=serv, desired_capabilities=caps)
    
    def extractPosition(self):
        """Will extract coordinates from a link"""
        try:
            link = WebDriverWait(self.driver, 100).until(EC.presence_of_element_located((By.CSS_SELECTOR, "head > meta[content^='https://maps.google.com']")))
                
            link = link.get_attribute("content")
            lat,lng = re.findall(r'\d[.]\d*', link)
            return lat,lng
        except Exception as err:
            raise err
    
    def recursiveExtractPosition(self, retry= 1):
        """Extract coordinate from a link.
        Will retry a given specified number of time if confronted with error"""
        errorCount = {"value" : 0}
        def extractPosition():
            """Will extract coordinates from a link"""
            try:
                link = WebDriverWait(self.driver, 100).until(EC.presence_of_element_located((By.CSS_SELECTOR, "head > meta[content^='https://maps.google.com']")))
                    
                link  : str = link.get_attribute("content")
                centerIndex = link.index("center")
                zoomIndex = link.index("zoom")

                lat,lng = re.findall(r'\d[.]\d*', link[centerIndex:zoomIndex])
                if lat == None:
                    raise
                return lat,lng
            
            except ValueError as valueError:
                x = re.findall(r'\d[.]\d*', link)
                raise valueError
            
            except StaleElementReferenceException as staleErr:
                if errorCount["value"] == retry:
                    raise staleErr
                errorCount["value"] += 1
                return extractPosition()
                
            except Exception as err:
                raise err
                
        return extractPosition()
        

    def main(self):
        self.initDriver()
        
        for index, item in self.parsedFile.iterrows():
            if not item["Position"] != item["Position"]:
                self.parsedFile.at[index, "Position"] = item["Position"] 
                continue
        

            #Resetting values 
            lat, lng = None, None
            link : WebElement = None
            try:
                self.driver.get(self._mapUrl + urllib.parse.quote(self.queryRefactor(ville = item["Ville"], commune = item["Commune"], pharmacy=item["Nom"])))
                
                lat, lng = self.recursiveExtractPosition()
                if lat and lng:
                    self.parsedFile.at[index, "Position"] = f"{lat},{lng}" 

            except Exception as unknownErr:
                # Upon unknown error, save current data
                print("Backup building ...")
                self.saveToExcel()
                raise unknownErr
                              
        self.saveToExcel()



if __name__ == "__main__":
    test = Scrapper("./datas/Pharmacies.xlsx")
    test.main()