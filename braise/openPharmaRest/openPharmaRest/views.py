from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet


# Test View with django rest framework
# Path: openPharmaRest/openPharmaRest/views.py
class TestView(APIView):
    def get(self, request):
        return Response({'message': 'Hello, World!'})
