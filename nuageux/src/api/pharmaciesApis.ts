import {
  IPanigation,
  PharmacyData,
  PharmacyDataDetailed,
  PharmacyDataDetailedForMofication,
  UserPharmacyData,
} from "@/types/dataTypes";
import axios from "axios";

import { administratorEndpoint, usersEndpoint } from "@/constants/endpoint";

export const getPharmacies = ({
  page = 1,
  nameFilter = "",
  zoneFilter = "",
  activeFilter = "",
  openFilter = "",
}) => {
  return axios.get<IPanigation<PharmacyData>>(
    `${administratorEndpoint}/pharmacies/?name=${nameFilter}&zone=${zoneFilter}&active=${activeFilter}&open=${openFilter}&page=${page}`
  );
};

export const getPharmacyDetails = (id: string) => {
  return axios.get<PharmacyDataDetailed>(
    `${administratorEndpoint}/pharmacies/${id}/`
  );
};

export const updatePharmacyDetails = (
  data: PharmacyDataDetailedForMofication
) => {
  return axios.patch<PharmacyDataDetailed>(
    `${administratorEndpoint}/pharmacies/${data.id}/`,
    data
  );
};

export const activatePharmacy = (id: string) => {
  return axios.post<PharmacyData>(
    `${administratorEndpoint}/pharmacies/${id}/activate/`
  );
};

export const deactivatePharmacy = (id: string) => {
  return axios.post<PharmacyData>(
    `${administratorEndpoint}/pharmacies/${id}/deactivate/`
  );
};

export const getZones = () => {
  return axios.get<string[]>(`${administratorEndpoint}/get-zones/`);
};

export const getUsersPharmaciesList = () => {
  return axios.get<UserPharmacyData[]>(`${usersEndpoint}/pharmacies/`);
};
