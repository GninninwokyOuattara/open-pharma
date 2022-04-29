import json
import os
import urllib
import aiohttp
from bs4 import BeautifulSoup
from asyncio import create_task, gather, run
from re import match
from tqdm import tqdm
from classes.base_pharmacy import BasePharmacy

from classes.link_with_coordinates import LinkWithCoordinates

from constants.constants import PHARMACIES_DATAS_FILE_PATH,PHARMACIES_LIST_FILE_PATH


class GoogleMaps:
    _maps_search_url = "https://google.com/maps/search/"
    _meta_link_selector = "head > meta[content^='https://maps.google.com']"
    _query_structure = r"^pharmacie\s{1}[\w\W]+"
    _cached_data = {}
    
    def __build_query(self, query : str):
        if match(self._query_structure,query.lower()):
            return self._maps_search_url + urllib.parse.quote("côte d'ivoire " + query)
        raise ValueError("Provived value is not of a valid pharmacie name structure.", query)
    
    async def __async_get_meta_link(self, query:str) -> LinkWithCoordinates:
        async with aiohttp.ClientSession() as session:
            async with session.get(self.__build_query(self, query)) as resp:
                page = await resp.read()
                pageSoup = BeautifulSoup(page, "html.parser").select_one(self._meta_link_selector)
                if self.pbar:
                    self.pbar.set_description(query)
                    self.pbar.update(1)
                    pharmacy = BasePharmacy(query)
                    self._cached_data[pharmacy._name] = {**pharmacy.__dict__, "coordinates" : LinkWithCoordinates(pageSoup["content"]).coordinates()}
                return LinkWithCoordinates(pageSoup["content"])
        

    async def __async_get_meta_links(self, queries : list[str]):
        tasks = [create_task(self.__async_get_meta_link(self, query)) for query in queries]
        with tqdm(total=len(tasks)) as self.pbar:
            try:
                resultsSet = await gather(*tasks)
                with open(PHARMACIES_DATAS_FILE_PATH, "w") as f:
                    f.write(json.dumps(self._cached_data))
            except Exception as e:
                previous_data = None
                if os.path.exists(PHARMACIES_DATAS_FILE_PATH):
                    with open(PHARMACIES_DATAS_FILE_PATH, "r") as f:
                        previous_data = json.loads(f.read())
                with open("cached.json", "w") as f:
                    if previous_data:
                        self._cached_data = {**self._cached_data, **previous_data}
                    f.write(json.dumps(self._cached_data))
                raise e
            
        self.pbar = None
        return resultsSet
    
    @classmethod
    def get_meta_link(self, query : str):
        result = run(self.__async_get_meta_link(self, query))
        return result
    
    @classmethod
    def get_meta_links(self, queries : list[str]) -> tuple[LinkWithCoordinates]:
        if os.path.exists(PHARMACIES_DATAS_FILE_PATH):
            with open(PHARMACIES_DATAS_FILE_PATH, "r") as f:
                self._cached_data : dict = json.loads(f.read())
                print(f"{len(self._cached_data.keys())} will be skipped as they have already been fetched.")
                q= []
                for query in queries:
                    query = BasePharmacy(query)
                    if not query._name_safe in self._cached_data:
                        q.append(query.name)
                if len(q):
                    resultsSet = run(self.__async_get_meta_links(self, q))
                    return resultsSet
                print("All data have already been collected.")
        else:
            resultsSet = run(self.__async_get_meta_links(self, queries))
            return resultsSet
