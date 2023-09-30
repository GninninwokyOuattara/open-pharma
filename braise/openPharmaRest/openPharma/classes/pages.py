from openPharma.interfaces.page import Page
from requests import get


class PharmaConsultPage(Page):
    def __init__(self, url: str):
        self.url = url

    def get_page(self):
        try:
            response = get(self.url)
            if (response.ok):
                return response.text
            raise Exception("Error while fetching page")
        except Exception as e:
            raise e
