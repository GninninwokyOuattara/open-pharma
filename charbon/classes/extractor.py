from bs4 import BeautifulSoup
from requests import Response
from constants.selectors import ROW_DATA, TABLE_ROW
from methods.replaceMany import replaceMany

from constants.selectors import PHARMA_LOCATION, PHARMA_TABLE

class Extractor:
    """
    Class that will extract data from html page
    """
    
    soup = BeautifulSoup()
    
    def __init__(self, source : Response):
        self.source  = source
        self._soup  = BeautifulSoup(self.source, "html.parser")
    
    @property
    def source(self):
        return self._source
    
    @source.setter
    def source(self, value):
        if not isinstance(value, Response) :
            raise TypeError
        self._source = value.text
        
    def extractTitles(self) -> list[str]:
        headers = [header.text.replace("\t", "").strip() for header in self._soup.select(PHARMA_LOCATION)]
        return headers
    
    def extractDatas(self):
        tables = self._soup.select(PHARMA_TABLE)
        tableData = []
        for i in range(len(tables)):
            rows = tables[i].select(TABLE_ROW)
            datas = []
            for y in range(len(rows)):
                rowDatas = rows[y].select(ROW_DATA)
                data = {
                "name" : rowDatas[0].text,
                "owner" : rowDatas[1].text,
                "contact" : rowDatas[2].text.replace(" ","").split("/"),
                "position" : rowDatas[4].text,
                "begin" : rowDatas[5].text,
                "end" : rowDatas[6].text  
                }
                
                datas.append(data)
                # print(datas)
            tableData.append({i : datas})
        return tableData
                
            