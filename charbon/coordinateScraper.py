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
        self.datas = []
        self.parseFile()
        
    def saveToExcel(self):
        self.parsedFile.to_excel("./test.xlsx", sheet_name='Sheet_name_1', index= False)
        print("File save")
        
    def queryRefactor(self, commune : str, pharmacy : str):
            commune = commune.lower()
            pharmacy = pharmacy.lower()
            if commune in pharmacy:
                pharmacy : list[str] = pharmacy.split(" ")
                try:
                    pharmacy.remove(commune)
                    pharmacy = " ".join(pharmacy).strip()
                    return commune + " " + pharmacy
                except ValueError as err:
                    pharmacy = " ".join(pharmacy).strip()
                    return pharmacy
            else :
                return commune + " " +pharmacy
                
        
        
    def parseFile(self):
        if not os.path.exists(self._filePath):
            return FileNotFoundError
        try:
            self.parsedFile = pd.read_excel(self._filePath)
        except Exception as e:
            raise e      

    def initDriver(self):
        serv = Service("./chromedriver")
        options = webdriver.ChromeOptions()
        # options.add_experimental_option('excludeSwitches', ['enable-logging'])
        caps = DesiredCapabilities().CHROME
        caps["pageLoadStrategy"] = "none"
        self.driver = webdriver.Chrome(options=options, service=serv, desired_capabilities=caps)

    def main(self):
        # sample = self.parsedFile[0:20]
        self.initDriver()
        for index, item in self.parsedFile.iterrows():
        # for index, item in sample.iterrows():
        
            print(">", item["Nom"])

            lat, lng = None, None
            link : WebElement = None
            try:
                self.driver.get(self._mapUrl + urllib.parse.quote(self.queryRefactor(commune = item["Commune"], pharmacy=item["Nom"])))
                link = WebDriverWait(self.driver, 100).until(EC.presence_of_element_located((By.CSS_SELECTOR, "head > meta[content^='https://maps.google.com']")))
            
                link = link.get_attribute("content")
                lat,lng = re.findall(r'\d[.]\d*', link)
            
            except StaleElementReferenceException as i:
                print("Stale, Retrying", end= " ")
                try:
                    link = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "head > meta[content^='https://maps.google.com']")))
                
                    link = link.get_attribute("content")
                    lat,lng = re.findall(r'\d[.]\d*', link)
                    print("\n")
                except StaleElementReferenceException as e:
                    print("Stale Again, abort.")
                    pass
                except Exception as e:
                    print("Unknown error, Passed")
                    pass
                    
                pass
            except Exception as e:
                print("Passed")
                pass
            # print(lat, lng)
            # self.parsedFile[index]["Position"] = {lat : lat, lng: lng}
            if lat and lng:
                self.parsedFile.at[index, "Position"] = f"{lat},{lng}"                   
        self.saveToExcel()


if __name__ == "__main__":
    test = Scrapper("./datas/Pharmacies.xlsx")
    test.main()