from requests import request
from constants.links import SITE_URL
from classes.extractor import Extractor
import json
from datetime import datetime
import os



page = request(method="GET", url=SITE_URL)

print("Scrapping...", end=" ")

extractor = Extractor(page)
collectedDatas = extractor.labelMapping()

print("DONE.")

if not os.path.exists("./datas"):
    os.mkdir("./datas")


now = datetime.now()
filename = now.strftime("%d-%m-%Y-%H-%M-%S")

print(f"Saving collected datas in /datas/{filename}.json", end=" ")

with open(f"./datas/{filename}.json", "w+") as f:
    collectedDatas = json.dumps(collectedDatas)
    f.write(collectedDatas)

print("DONE.")




