from abc import ABC, abstractmethod
from typing import Any, List

from bs4 import BeautifulSoup, Tag

# from classes.Pharmacy import Pharmacy


class Page(ABC):
    url: str

    @abstractmethod
    def get_page(self) -> Any:
        pass
