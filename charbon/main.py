import aiohttp
import asyncio
import urllib
import os
import json
import re

from datetime import datetime
from requests import request
from tqdm import tqdm
from bs4 import BeautifulSoup
from selenium import webdriver

from sel import SeleniumScraper


from constants.selectors import PHARMACY_DIRECTOR, PHARMACY_TITLE, UBIFARM_NUMPAGE, UBIFARM_PHARMACY
from constants.links import UBIFARM_URL



class WebScraper:
    
    def __init__(self):
        self.url_source = UBIFARM_URL
        self.urls = []
        self.tqdm : tqdm = None
        self.all_datas = []
        self.selenium_bin = []
        self.page_max_number = self.getPageMaxNumber()
        self.c = 0
        self.visited = []
        
        asyncio.run(self.main())
        
    def getPageMaxNumber(self):
        page = request(method="GET", url=self.url_source)
        pageSoup = BeautifulSoup(page.text, "html.parser")
        numPage = pageSoup.select_one(UBIFARM_NUMPAGE).text.split("/")[1].strip()
        return int(numPage)

    async def fetch(self, session, url):
        async with session.get(url) as response:
            res = await response.text()
            pharmacies = await self.soupItUp(res)
            # self.tqdm.update(1)
            return pharmacies
        
    async def fetchCoordinates(self, session, data):
        """Fetch google maps coordinates for an address
        data is the format {pharmacy_name : str, pharmacy_director : str}"""
        
        
        name = data["pharmacy_name"]
        url = f"https://google.com/maps/search/{urllib.parse.quote(name)}"
        async with session.get(url) as response:
            res = await response.text()
            soup = BeautifulSoup(res, "html.parser")
            # sometimes when the search is not unique enough for google maps it will return all element in proximity
            proxim = soup.select_one('meta[content^="Pharmacie à proximité"]')
            if proxim:
                #In case we do not get a precise result, we insert in into array that will be processed using selenium, google maps use javascript.
                self.selenium_bin.append(data)
                
                
                # To delete later
                # link = str(soup.select_one('a[href^="https://www.google.com/maps"]').href)
                # lat,lng = re.findall(r'\d[.]\d*', link)
                # data["coordinates"] = {"lat" : lat, "lng" : lng}
                self.tqdm.update(1)
                return []
            
            else:
                try:
                    meta = str(soup.select_one('meta[content^="https://"]'))
                    coordinates = meta[65:meta.index("&amp")].split("%2C")
                    data["coordinates"] = { "lat" : float(coordinates[0]), "lng" : float(coordinates[1])}
                except ValueError as e:
                    print(data)
                    print(str(e))
                    raise e
            self.tqdm.update(1)
            return data
            
    
    async def soupItUp(self, text):
        soup = BeautifulSoup(text, "html.parser")
        datas = soup.select('li[data-country="COTE D\'IVOIRE"]')
        pharmacies = []
        for data in datas:
            pharma_title = "PHARMACIE " + data.select_one(PHARMACY_TITLE).getText(strip=True).replace("\u00c8", "E").replace("*", "")
            pharma_director = data.select_one(PHARMACY_DIRECTOR).text.replace("\t", "").replace("\r", "")[1:-1].split("\n")[0]
            
            if pharma_title in self.visited:
                continue
            print(pharma_title)

            self.visited.append(pharma_title)
            pharmacies.append({"pharmacy_name" : pharma_title, "pharmacy_director" : pharma_director})
        return pharmacies
    
    async def main(self):
        print("Fetching all pharmacies....\n")
        headers = {
            "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
        async with aiohttp.ClientSession(headers = headers) as session:
            tasks = [self.fetch(session, f"{UBIFARM_URL}?pageannu={i}") for i in range(self.page_max_number+1)]
            # self.tqdm = tqdm(total=self.page_max_number+1)
            results = await asyncio.gather(*tasks)
            self.tqdm.close()
            self.tqdm = None
            
            
            
            
            for element in results:
                self.all_datas = [*self.all_datas, *element]
                
            print("\nTotal number found :", len(self.all_datas))
            print("Duplicate skipped", len(self.visited))
            print(self.visited)
        
        print("\nFetching pharmacies maps coordinates...\n")
        async with aiohttp.ClientSession(headers = headers) as session:
            tasks = [self.fetchCoordinates(session, data=data) for data in self.all_datas]
            self.tqdm = tqdm(total=len(self.all_datas))
            results = await asyncio.gather(*tasks)
            self.tqdm.close()
            self.all_datas = []
            
            for element in results:
                self.all_datas = [*self.all_datas, element]
            
            print("Imprecise pharmacy name : ", len(self.selenium_bin))
            print("Beginning retrieval of information with selenium...\n")
            
            
            seleniumScraper = SeleniumScraper(self.selenium_bin)
            results =  seleniumScraper.run()
            self.all_datas.extend(results)
            
            # Implement the selenium counterpart later
            
        return 
    



if __name__ == "__main__":
    scraper = WebScraper()
    print(len(scraper.all_datas))

    if not os.path.exists("./datas"):
        os.mkdir("./datas")


    now = datetime.now()
    filename = now.strftime("%d-%m-%Y-%H-%M-%S")

    print(f"Saving collected datas in /datas/{filename}.json", end=" ")

    with open(f"./datas/{filename}.json", "w+") as f:
        collectedDatas = json.dumps(scraper.all_datas)
        f.write(collectedDatas)

    print("DONE.")