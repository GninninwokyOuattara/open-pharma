from bs4 import BeautifulSoup, Tag
from requests import get
from constants.links import PHARMA_CONSULTS_URL
from constants.selectors import PHARMA_CONSULTS_ROW, PHARMA_CONSULTS_ROW_DATAS
from classes.open_pharmacy import OpenPharmacy


class PharmaConsults:
    
    open_pharmacies = {}
    @classmethod
    def getCurrentlyOpenPharmacies(self):
        try:
            page = get(PHARMA_CONSULTS_URL)
            
            if page.status_code == 200:
                pageSoup = BeautifulSoup(page.text, "html.parser")
                tablesRows = pageSoup.select(PHARMA_CONSULTS_ROW)
                # open_pharmacies = []
                for row in tablesRows:
                    rowData = row.select(PHARMA_CONSULTS_ROW_DATAS)
                    # rowData = [data.get_text(strip=True) for data in rowData]
                    # print(rowData[4])
                    name = rowData[0].get_text(strip=True)
                    supervisor = rowData[1].get_text(strip=True)
                    phone_numbers = rowData[2].get_text(strip=True)
                    geographical_position = rowData[3].get_text(strip=True)
                    google_maps_position_link = rowData[4].select_one("a")
                    google_maps_position_link = google_maps_position_link["href"] if google_maps_position_link else ""
                    open_from = rowData[5].get_text(strip=True)
                    open_until = rowData[6].get_text(strip=True)
                    pharmacy = OpenPharmacy(name=name, supervisor=supervisor, phone_numbers=phone_numbers,geographical_position=geographical_position, google_maps_position_link=google_maps_position_link, open_from=open_from, open_until=open_until)
                    # open_pharmacies.append(pharmacy.__dict__)
                    self.open_pharmacies[pharmacy._name_safe] = pharmacy.__dict__
                return self.open_pharmacies
            else:
                raise "Could not access web page"
        except Exception as e:
            raise e
        
        
    
    
    