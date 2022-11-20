from datetime import datetime, timedelta

from django.urls import reverse, reverse_lazy
from openPharma.models import OpenPharmacy, Pharmacy
from rest_framework import status
from rest_framework.test import APITestCase


class TestPharmaciesListingTestCase(APITestCase):

    def setUp(self):

        # current date formatted like dd/mm/yyyy
        self.current_date = datetime.now().strftime("%Y-%m-%d")
        # one week after current date
        self.one_week_after = (
            datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")

        self.two_weeks_after = (
            datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d")

        # print("Current date: ", self.current_date)
        # print("One week after: ", self.one_week_after)
        # print("Two weeks after: ", self.two_weeks_after)

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

        # Open one pharmacy for the current week
        OpenPharmacy.objects.create(
            pharmacy=Pharmacy.objects.first(),
            open_from=self.current_date,
            open_until=self.one_week_after,
        )

        # Open one pharmacy for the next week
        OpenPharmacy.objects.create(
            pharmacy=Pharmacy.objects.last(),
            open_from=self.one_week_after,
            open_until=self.two_weeks_after,
        )

    # PHARMACIES

    def test_get_all_pharmacies(self):

        all_pharmacies = Pharmacy.objects.all()
        self.assertEqual(len(all_pharmacies), 10)

    def test_get_active_pharmacies(self):

        active_pharmacies = Pharmacy.objects.filter(active=True)
        self.assertEqual(len(active_pharmacies), 5)

    def test_get_pending_pharmacies(self):

        pending_pharmacies = Pharmacy.objects.filter(active=False)
        self.assertEqual(len(pending_pharmacies), 5)

    # OPEN PHARMACIES

    def test_getall_open_pharmacies(self):

        open_pharmacies = OpenPharmacy.objects.all()
        self.assertEqual(len(open_pharmacies), 2)

    def test_get_open_pharmacies_for_current_week(self):

        open_pharmacies = OpenPharmacy.objects.filter(
            open_from__lte=self.current_date,
            open_until__gte=self.current_date
        )
        self.assertEqual(len(open_pharmacies), 1)

    def test_get_open_pharmacies_for_next_week(self):

        open_pharmacies = OpenPharmacy.objects.filter(
            open_from__lte=self.one_week_after,
            open_until__gte=self.two_weeks_after
        )
        self.assertEqual(len(open_pharmacies), 1)


class TestPharmaciesInsertionTestCase(APITestCase):

    def test_user_cant_insert_pharmacy(self):

        url = reverse('pharmacies-list')
        data = {
            "name": "Pharmacy 1",
            "latitude": 0.123,
            "longitude": 0.123,
            "active": True,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_admin_can_insert_pharmacy(self):

        url = reverse('admin-pharmacies-list')
        data = {
            "name": "Pharmacy 1",
            "latitude": 0.123,
            "longitude": 0.123,
            "active": True,
            "pending_review": False,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

    def test_admin_cant_insert_active_and_pending_pharmacy(self):

        url = reverse('admin-pharmacies-list')
        data = {
            "name": "Pharmacy 1",
            "latitude": 0.123,
            "longitude": 0.123,
            "active": True,
            "pending_review": True,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_admin_can_insert_pending_pharmacy(self):

        url = reverse('admin-pharmacies-list')
        data = {
            "name": "Pharmacy 1",
            "latitude": 0.123,
            "longitude": 0.123,
            "active": False,
            "pending_review": True,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

    def test_admin_can_activate_pending_review_pharmacy(self):

        url = reverse('admin-pharmacies-pending-review-list')

        # create pending review pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=False,
            pending_review=True,
        )

        # get pharmacies pending review
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        # assert pharmacy is inactive and pending review
        self.assertEqual(response.data[0]['active'], False)
        self.assertEqual(response.data[0]['pending_review'], True)

        # activate the pharmacy
        response = self.client.get(
            f"{url}{pharmacy.id}/activate/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert pharmacy is now active
        self.assertEqual(response.data['active'], True)
        self.assertEqual(response.data['pending_review'], False)

    def test_admin_can_deactivate_pending_review_pharmacy(self):

        url = reverse('admin-pharmacies-pending-review-list')

        # create pending review pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=False,
            pending_review=True,
        )

        # get pharmacies pending review
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        # assert pharmacy is inactive and pending review
        self.assertEqual(response.data[0]['active'], False)
        self.assertEqual(response.data[0]['pending_review'], True)

        # deactivate the pharmacy
        response = self.client.get(
            f"{url}{pharmacy.id}/deactivate/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert pharmacy is now inactive
        self.assertEqual(response.data['active'], False)
        self.assertEqual(response.data['pending_review'], False)

    def test_admin_can_open_pharmacy(self):

        url = reverse('admin-open-pharmacies-list')
        # create an active pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=True,
        )

        data = {
            "pharmacy_id": pharmacy.id,
            "open_from": "2020-01-01",
            "open_until": "2020-01-07",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

    def test_admin_cant_open_pending_pharmacy(self):

        url = reverse('admin-open-pharmacies-list')
        # create a pending pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=False,
        )

        data = {
            "pharmacy_id": pharmacy.id,
            "open_from": "2020-01-01",
            "open_until": "2020-01-07",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_admin_cant_open_inactive_pharmacy(self):

        url = reverse('admin-open-pharmacies-list')
        # create an inactive pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=False,
        )

        data = {
            "pharmacy_id": pharmacy.id,
            "open_from": "2020-01-01",
            "open_until": "2020-01-07",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_admin_cant_open_pharmacy_on_same_date_range(self):

        url = reverse('admin-open-pharmacies-list')
        # create an active pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=True,
        )

        data = {
            "pharmacy_id": pharmacy.id,
            "open_from": "2020-01-01",
            "open_until": "2020-01-07",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

        # try to open the same pharmacy on the same date range
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_admin_can_open_pharmacy_on_different_date_range(self):

        url = reverse('admin-open-pharmacies-list')
        # create an active pharmacy
        pharmacy = Pharmacy.objects.create(
            name="Pharmacy 1",
            latitude=0.123,
            longitude=0.123,
            active=True,
        )

        data = {
            "pharmacy_id": pharmacy.id,
            "open_from": "2020-01-01",
            "open_until": "2020-01-07",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

        # try to open the same pharmacy on a different date range
        data['open_from'] = '2020-01-08'
        data['open_until'] = '2020-01-14'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)
