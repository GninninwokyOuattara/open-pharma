from rest_framework.generics import GenericAPIView
from rest_framework.pagination import PageNumberPagination


class ResultsSetPagination(PageNumberPagination, GenericAPIView):
    page_size = 25
    page_size_query_param = 'size'
    max_page_size = 100
