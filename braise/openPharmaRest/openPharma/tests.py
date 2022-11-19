from datetime import datetime, timedelta

from django.urls import reverse, reverse_lazy
from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework import status
from rest_framework.test import APITestCase

# class PharmaciesPublic(APITestCase):

#     def test_get_empty(self):
#         url = reverse('pharmacies-current-state-list')

#         print("URL: ", url)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, [])


# class Pharmacies(APITestCase):
#     current_date = datetime.now()

#     def test_create_pharmacy(self):
#         url = reverse("pharmacies-list")

#         # get pharmacies
#         pharmacies = Pharmacy.objects.all()
#         self.assertEqual(len(pharmacies), 0)

#         # create ten pharmacies
#         for i in range(10):
#             Pharmacy.objects.create(name="Pharmacy {}".format(
#                 i), latitude=0.123, longitude=0.123)

#         pharmacies = Pharmacy.objects.all()
#         self.assertEqual(len(pharmacies), 2)


# class PharmaciesAdmin(APITestCase):

#     def test_list(self):
#         url = reverse('admin-pharmacies-list')

#         print("URL: ", url)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, [])

#     def test_create(self):
#         url = reverse('admin-pharmacies-list')

#         data = {
#             "name": "eze",
#             "director": "",
#             "addresses": [],
#             "phones": [],
#             "email": "",
#             "website": "",
#             "description": "",
#             "images": [],
#             "google_maps_link": "",
#             "latitude": 0.22,
#             "longitude": 1.22,
#             "active": False,
#             "pending_review": False
#         }

#         response = self.client.post(url, data, format='json')
#         print("Response: ", response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Pharmacy.objects.count(), 1)
#         self.assertEqual(Pharmacy.objects.get().name, 'eze')

#     def test_create_different(self):
#         url = reverse('admin-pharmacies-list')

#         Pharmacy.objects.create(
#             name="eze",
#             director="",
#             addresses=[],
#             phones=[],
#             email="",
#             website="",
#             description="",
#             images=[],
#             google_maps_link="",
#             latitude=0.22,
#             longitude=1.22,
#             active=True,
#             pending_review=False

#         )

#         # get pharmacies
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)


class TestPharmaciesListingTestCase(APITestCase):

    def setUp(self):

        # current date formatted like dd/mm/yyyy
        self.current_date = datetime.now().strftime("%Y-%m-%d")
        # one week after current date
        self.one_week_after = (
            datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")

        print("Current date: ", self.current_date)
        print("One week after: ", self.one_week_after)

        for i in range(5):
            # Create 5 actives pharmacies
            Pharmacy.objects.create(
                name="Pharmacy {}".format(i),
                latitude=0.123,
                longitude=0.123,
                active=True,
            )

            # create 5 pending pharmacies
            Pharmacy.objects.create(
                name="Pharmacy {}".format(i),
                latitude=0.123,
                longitude=0.123,
                active=False,
            )

        # Open one pharmacy for the current month
        OpenPharmacy.objects.create(
            pharmacy=Pharmacy.objects.first(),
            open_from=self.current_date,
            open_until=self.one_week_after,
        )

    def test_get_all_pharmacies(self):

        all_pharmacies = Pharmacy.objects.all()
        self.assertEqual(len(all_pharmacies), 10)

    def test_get_active_pharmacies(self):

        active_pharmacies = Pharmacy.objects.filter(active=True)
        self.assertEqual(len(active_pharmacies), 5)

    def test_get_pending_pharmacies(self):

        pending_pharmacies = Pharmacy.objects.filter(active=False)
        self.assertEqual(len(pending_pharmacies), 5)

    def test_get_open_pharmacies(self):

        open_pharmacies = OpenPharmacy.objects.all()
        self.assertEqual(len(open_pharmacies), 1)
