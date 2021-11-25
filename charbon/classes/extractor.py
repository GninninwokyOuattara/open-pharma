from bs4 import BeautifulSoup
from requests import Response
from charbon.classes.pharmacy import Pharmacy
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
        self._headers = self.extractTitles()
        self._datas = self.extractDatas() 
    
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
        """Retrieve all information from tables, group them by rows and return them by indexes (Position of the table from 0)

        Returns:
            list: A list of object with keys corresponding to the table order
        """
        tables = self._soup.select(PHARMA_TABLE)
        # tableData = []
        tableDatas = {}
        for i in range(len(tables)):
            rows = tables[i].select(TABLE_ROW)
            datas = []
            for y in range(len(rows)):
                rowDatas = rows[y].select(ROW_DATA)
                # data = {
                # "name" : rowDatas[0].text,
                # "owner" : rowDatas[1].text,
                # "contact" : rowDatas[2].text.replace(" ","").split("/"),
                # # "position" : "",
                # "from" : rowDatas[5].text,
                # "to" : rowDatas[6].text  
                # }
                
                # datas.append(data)
                datas.append(Pharmacy(name=rowDatas[0], owner=rowDatas[1].text, contact=rowDatas[2].text.replace(" ", "").split("/"), status="Open"))
            # tableData.append({i : datas})
            tableDatas[i] = datas
        return tableDatas
    
    def labelMapping(self):
        """Map phamarcy title to data collected
        """
        datasObject = {}
        for idx, _ in enumerate(self._headers):
            # returnObject.append({self._headers[idx] : self._datas[idx]})
            # returnObject[self._headers[idx]] = self._datas[idx]
            datasObject = {**datasObject, self._headers[idx] : self._datas[idx]}
        
        return datasObject
        
                
            