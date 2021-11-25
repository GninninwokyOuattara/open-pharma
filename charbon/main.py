from bs4.element import ResultSet
import aiohttp
import asyncio
import urllib
import os
import json

from datetime import datetime
from requests import request
from tqdm import tqdm
from bs4 import BeautifulSoup
from constants.selectors import PHARMACY_DIRECTOR, PHARMACY_TITLE, UBIFARM_NUMPAGE, UBIFARM_PHARMACY

from constants.links import UBIFARM_URL



class WebScraper:
    
    def __init__(self):
        self.url_source = UBIFARM_URL
        self.urls = []
        self.tqdm : tqdm = None
        self.all_datas = []
        self.page_max_number = self.getPageMaxNumber()
        
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
            self.tqdm.update(1)
            return pharmacies
        
    async def fetchCoordinates(self, session, data):
        name = data["pharmacy_name"]
        url = f"https://google.com/maps/search/{urllib.parse.quote(name)}"
        async with session.get(url) as response:
            res = await response.text()
            soup = BeautifulSoup(res, "html.parser")
            meta = str(soup.select_one('meta[content^="https://"]'))
            coordinates = meta[65:meta.index("&amp")].split("%2C")
            data["coordinates"] = { "lat" : float(coordinates[0]), "lng" : float(coordinates[1])}
            self.tqdm.update(1)
            return data
            
    
    async def soupItUp(self, text):
        soup = BeautifulSoup(text, "html.parser")
        datas = soup.select('li[data-country="COTE D\'IVOIRE"]')
        pharmacies = []
        for data in datas:
            pharma_title = data.select_one(PHARMACY_TITLE).getText(strip=True).replace("\u00c8", "E").replace("*", "")
            pharma_director = data.select_one(PHARMACY_DIRECTOR).text.replace("\t", "").replace("\r", "")[1:-1].split("\n")[0]
            pharmacies.append({"pharmacy_name" : f"PHARMACIE {pharma_title}", "pharmacy_director" : pharma_director})
        return pharmacies
    
    async def main(self):
        print("Fetching all pharmacies....")
        headers = {
            "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
        async with aiohttp.ClientSession(headers = headers) as session:
            tasks = [self.fetch(session, f"{UBIFARM_URL}?pageannu={i}") for i in range(self.page_max_number+1)]
            self.tqdm = tqdm(total=self.page_max_number+1)
            results = await asyncio.gather(*tasks)
            self.tqdm.close()
            self.tqdm = None
            
            
            for element in results:
                self.all_datas = [*self.all_datas, *element]
            # print("DONE")
        
        print("Fetching pharmacies maps coordinates...")
        async with aiohttp.ClientSession(headers = headers) as session:
            tasks = [self.fetchCoordinates(session, data=data) for data in self.all_datas]
            self.tqdm = tqdm(total=len(self.all_datas))
            results = await asyncio.gather(*tasks)
            self.tqdm.close()
            print("Done for the day")
            self.all_datas = []
            
            for element in results:
                self.all_datas = [*self.all_datas, element]
        return 
    
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