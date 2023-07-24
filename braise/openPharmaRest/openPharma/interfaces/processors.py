from abc import ABC, abstractmethod

from bs4 import Tag


class PageProcessor(ABC):

    page: Tag

    @abstractmethod
    def get_datas(self):
        pass
