import urllib
from requests import get
from bs4 import BeautifulSoup
from asyncio import create_task, gather, run
import http3

from link_with_coordinates import LinkWithCoordinates

class GoogleMaps:
    _maps_search_url = "https://google.com/maps/search/"
    _meta_link_selector = "head > meta[content^='https://maps.google.com']"
    
    def __build_query(self, query):
        return self._maps_search_url + urllib.parse.quote("côte d'ivoire" + query)
    
    # def __action_process(self, query : str):
    #     page = get(self._maps_search_url + urllib.parse.quote("côte d'ivoire" + query))
    #     pageSoup = BeautifulSoup(page.text, "html.parser").select_one(self._meta_link_selector)
    #     return LinkWithCoordinates(pageSoup["content"])
    
    # @classmethod
    # def get_meta_link(self, query : str):
    #     return self.__action_process(self, query)
    
    async def __async_get_meta_link(self, query:str):
        client = http3.AsyncClient()
        page = await client.get(self.__build_query(self,query))
        pageSoup = BeautifulSoup(page.text, "html.parser").select_one(self._meta_link_selector)
        return LinkWithCoordinates(pageSoup["content"])

    async def __async_get_meta_links(self, queries : list[str]):
        tasks = [create_task(self.async_get_meta_link(query)) for query in queries]
        resultsSet = await gather(*tasks)
        return resultsSet
    
    @classmethod
    def get_meta_link(self, query : str):
        result = run(self.__async_get_meta_link(self, query))
    
    @classmethod
    def get_meta_links(self, queries : list[str]):
        resultsSet = run(self.__async_get_meta_links(self, queries))
        return resultsSet
