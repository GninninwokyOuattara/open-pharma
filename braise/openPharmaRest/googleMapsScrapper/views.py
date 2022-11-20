from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.


class SearchApiView(APIView):
    def get(self, request, *args, **kwargs):
        # get name parameter
        name = request.query_params.get("name", None)
        # if no name parameter is provided, return error
        if name is None:
            return Response({"error": "Name parameter is required."}, status=400)

        # return name
        return Response({"name": name})
