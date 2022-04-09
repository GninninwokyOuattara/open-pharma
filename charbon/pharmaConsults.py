from bs4 import BeautifulSoup, Tag
from requests import get
from constants.links import PHARMA_CONSULTS_URL
from constants.selectors import PHARMA_CONSULTS_ROW, PHARMA_CONSULTS_ROW_DATAS
from openPharmacy import OpenPharmacy


class PharmaConsults:
    
    @classmethod
    def getCurrentlyOpenPharmacies(self):
        try:
            page = get(PHARMA_CONSULTS_URL)
            
            if page.status_code == 200:
                pageSoup = BeautifulSoup(page.text, "html.parser")
                tablesRows = pageSoup.select(PHARMA_CONSULTS_ROW)
                open_pharmacies = []
                for row in tablesRows:
                    rowData = row.select(PHARMA_CONSULTS_ROW_DATAS)
                    rowData = [data.get_text(strip=True) for data in rowData]
                    pharmacy = OpenPharmacy(name=rowData[0], open_from=rowData[1], open_until=rowData[2])
                    open_pharmacies.append(pharmacy.__dict__)
                return open_pharmacies
            else:
                raise "Could not access web page"
        except Exception as e:
            raise e
        
        
    
    
    