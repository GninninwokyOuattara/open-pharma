# import requests
import json
from datetime import datetime

import requests
# import BeautifulSoup
from bs4 import BeautifulSoup
from django.shortcuts import render
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from openPharma.models import Activity, OpenPharmacy, Pharmacy
from openTracker.models import TrackerHistory
from openTracker.utils import (extract_pharmacy_data_from_row,
                               get_currently_open_pharmacies_datas,
                               perform_get_currently_open_pharmacies_datas,
                               perform_pharmacy_insertion,
                               perform_pharmacy_opening)

SOURCE_URL = "https://pharma-consults.net/pharmacies-gardes"


class CurrentlyOpenPharmaciesView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            open_pharmacies_datas = get_currently_open_pharmacies_datas()
            return Response(open_pharmacies_datas, status=200)
        except Exception as error:
            return Response({"error": str(error)}, status=500)


class OpenPharmaActualizerView(APIView):

    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        start_time = timezone.now()
        end_time = None

        n_insertions = 0
        n_updates = 0
        n_skipped_already_open = 0
        n_skipped_inactive = 0

        pharmacies_datas = None

        try:
            pharmacies_datas = perform_get_currently_open_pharmacies_datas()
            for pharmacy_datas in pharmacies_datas:
                # Look for the pharmacy in the db
                pharmacy = Pharmacy.objects.filter(
                    name=pharmacy_datas["name"], latitude=pharmacy_datas["latitude"], longitude=pharmacy_datas["longitude"])
                if not pharmacy.exists():
                    # Doesn't exist, insert new ones as pending_review by admin
                    Pharmacy.objects.create(
                        name=pharmacy_datas["name"],
                        director=pharmacy_datas["director"],
                        addresses=pharmacy_datas["addresses"],
                        phones=pharmacy_datas["phones"],
                        google_maps_link=pharmacy_datas["google_maps_link"],
                        latitude=pharmacy_datas["latitude"],
                        longitude=pharmacy_datas["longitude"],
                        pending_review=True,
                        active=False)
                    continue

                pharmacy = pharmacy[0]

                if not pharmacy.active:
                    n_skipped_inactive += 1
                    continue

                pharmacy_datas["open_from"] = datetime.strptime(
                    pharmacy_datas["open_from"], '%d/%m/%Y')
                pharmacy_datas["open_until"] = datetime.strptime(
                    pharmacy_datas["open_until"], '%d/%m/%Y')

                open_pharmacy = OpenPharmacy.objects.filter(
                    pharmacy=pharmacy, open_from__lte=pharmacy_datas["open_from"],
                    open_until__gte=pharmacy_datas["open_until"])

                if open_pharmacy.exists():
                    n_skipped_already_open += 1
                    continue

                # try to open pharmacy at provided date range
                OpenPharmacy.objects.create(
                    pharmacy=pharmacy, open_from=pharmacy_datas["open_from"], open_until=pharmacy_datas["open_until"])
                n_updates += 1
                continue

        except Exception as error:
            print(error)
            return Response({"message": "An unexpected error accured."}, status=500)

        finally:
            end_time = timezone.now()
            duration = (end_time - start_time)

            try:

                # insert in TrackerHistory
                TrackerHistory.objects.create(
                    start_time=start_time,
                    end_time=end_time,
                    duration=duration,
                    mode="Manual",
                    inserted_pharmacies=n_insertions,
                    updated_pharmacies=n_updates,
                    skipped_pharmacies=n_skipped_inactive,
                    already_open_pharmacies=n_skipped_already_open
                )

                # Insert in Activity
                Activity.objects.create(
                    type="Actualization",
                    action="Manual",
                    description=f"Manual Actualization",
                )

            except Exception as error:
                print(error)
                return Response({"message": "An unexpected error accured."}, status=500)

        return Response({
            "message": "Pharmacies actualized successfully.",
            "inserted_pharmacies": n_insertions,
            "updated_pharmacies": n_updates,
            "skipped_pharmacies":   n_skipped_inactive,
            "already_open_pharmacies": n_skipped_already_open
        }, status=200)
