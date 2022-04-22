import urllib
import aiohttp
from bs4 import BeautifulSoup
from asyncio import create_task, gather, run

from link_with_coordinates import LinkWithCoordinates

class GoogleMaps:
    _maps_search_url = "https://google.com/maps/search/"
    _meta_link_selector = "head > meta[content^='https://maps.google.com']"
    
    def __build_query(self, query):
        return self._maps_search_url + urllib.parse.quote("côte d'ivoire" + query)
    
    async def __async_get_meta_link(self, query:str):
        
        async with aiohttp.ClientSession() as session:
            async with session.get(self.__build_query(self, query)) as resp:
                page = await resp.read()
                pageSoup = BeautifulSoup(page, "html.parser").select_one(self._meta_link_selector)
                return LinkWithCoordinates(pageSoup["content"])
        

    async def __async_get_meta_links(self, queries : list[str]):
        tasks = [create_task(self.__async_get_meta_link(self, query)) for query in queries]
        resultsSet = await gather(*tasks)
        return resultsSet
    
    @classmethod
    def get_meta_link(self, query : str):
        result = run(self.__async_get_meta_link(self, query))
        return result
    
    @classmethod
    def get_meta_links(self, queries : list[str]):
        resultsSet = run(self.__async_get_meta_links(self, queries))
        return resultsSet
