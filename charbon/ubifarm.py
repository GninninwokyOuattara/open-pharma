import asyncio
from datetime import datetime
import os
import json

from bs4 import BeautifulSoup
from tqdm import tqdm
from requests import request
import requests_async as asyncReq
from constants.selectors import PHARMACY_DIRECTOR, PHARMACY_TITLE, UBIFARM_PHARMACY

from constants.selectors import UBIFARM_NUMPAGE
from constants.links import UBIFARM_URL
import random

# loop = asyncio.get_event_loop()

async def asyncFetch(url : str):
    return request(method="GET", url=url)

async def extractPharmacies(page : str):
    soup = BeautifulSoup(page.text, "html.parser")
    
    #Retrieve all pharmacies within the page
    datas = soup.select(UBIFARM_PHARMACY)
    datas = soup.select('li[data-country="COTE D\'IVOIRE"]')
    pharmacies = []
    for data in datas:
        pharma_title = data.select_one(PHARMACY_TITLE).getText(strip=True).replace("\u00c8", "").replace("*", "")
        pharma_director = data.select_one(PHARMACY_DIRECTOR).text.replace("\t", "").replace("\r", "")[1:-1].split("\n")[0]
        pharmacies.append({"pharmacy_name" : pharma_title, "pharmacy_director" : pharma_director})
    return pharmacies


async def pageScrap(url : str, pageNumber = 1, pbar  : tqdm = None):
    await asyncReq.get(f"{url}?pageannu={pageNumber}")
    page = request(method="GET", url=f"{url}?pageannu={pageNumber}")
    # soup = BeautifulSoup(page.text, "html.parser")
    
    # Retrieve all pharmacies within the page
    # datas = soup.select(UBIFARM_PHARMACY)
    # datas = soup.select('li[data-country="COTE D\'IVOIRE"]')
    pharmacies = await extractPharmacies(page)
    # for data in datas:
    #     pharma_title = data.select_one(PHARMACY_TITLE).getText(strip=True).replace("\u00c8", "").replace("*", "")
    #     pharma_director = data.select_one(PHARMACY_DIRECTOR).text.replace("\t", "").replace("\r", "")[1:-1].split("\n")[0]
    #     pharmacies.append({"pharmacy_name" : pharma_title, "pharmacy_director" : pharma_director})

    if pbar:
        pbar.update(1)
    return pharmacies

# async def main():

#     tasks = []
#     for i in range(2):
#         tasks.append(asyncio.create_task(asyncFetch(UBIFARM_URL)))
#     e = await asyncio.gather(*tasks)
#     print(e)

# results = asyncio.run(main())


# print("Getting the maximum number of pages to scrap...")

page = request(method="GET", url=UBIFARM_URL)
pageSoup = BeautifulSoup(page.text, "html.parser")
numPage = pageSoup.select_one(UBIFARM_NUMPAGE).text.split("/")[1].strip()


async def mainScraper():
    # tasks  = []
    # #Run pageScrap() for each page
    # print("Building targeted address links")
    # pbar = tqdm(range(int(numPage)+1))
    # for i in pbar:
    #     pbar.set_description(f"Target {i} - {UBIFARM_URL}?pageannu={i+1}")
    #     tasks.append(asyncio.create_task(pageScrap(UBIFARM_URL, pageNumber=i+1)))
    tq = tqdm(total=int(numPage)+1)
    tasks = [asyncio.create_task(pageScrap(UBIFARM_URL, pageNumber=i, pbar=tq)) for i in range(int(numPage)+1)]
    results = await asyncio.gather(*tasks)
    tq.close()
    # Results contains a tuple of array of element returned by pageScrap
    # We need to make it into one array
    endResults = []
    
    for element in results:
        endResults = [*endResults, *element]
    print("\nScraping completed.")
    return endResults
    
    
collectedDatas = asyncio.run(mainScraper())


if not os.path.exists("./datas"):
    os.mkdir("./datas")


now = datetime.now()
filename = now.strftime("%d-%m-%Y-%H-%M-%S")

print(f"Saving collected datas in /datas/{filename}.json", end=" ")

with open(f"./datas/{filename}.json", "w+") as f:
    collectedDatas = json.dumps(collectedDatas)
    f.write(collectedDatas)

print("DONE.")