import {
  IPanigation,
  PharmacyData,
  PharmacyDataDetailed,
  PharmacyDataDetailedForMofication,
  UserPharmacyData,
} from "@/types/dataTypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;
const user_url = import.meta.env.VITE_BACKEND_USER_ADDRESS;

export const getPharmacies = ({
  page = 1,
  nameFilter = "",
  zoneFilter = "",
  activeFilter = "",
  openFilter = "",
}) => {
  return axios.get<IPanigation<PharmacyData>>(
    `${url}/pharmacies/?name=${nameFilter}&zone=${zoneFilter}&active=${activeFilter}&open=${openFilter}&page=${page}`
  );
};

export const getPharmacyDetails = (id: string) => {
  return axios.get<PharmacyDataDetailed>(`${url}/pharmacies/${id}/`);
};

export const updatePharmacyDetails = (
  data: PharmacyDataDetailedForMofication
) => {
  return axios.patch<PharmacyDataDetailed>(
    `${url}/pharmacies/${data.id}/`,
    data
  );
};

export const activatePharmacy = (id: string) => {
  return axios.post<PharmacyData>(`${url}/pharmacies/${id}/activate/`);
};

export const deactivatePharmacy = (id: string) => {
  return axios.post<PharmacyData>(`${url}/pharmacies/${id}/deactivate/`);
};

export const getZones = () => {
  return axios.get<string[]>(`${url}/get-zones/`);
};

export const getUsersPharmaciesList = () => {
  return axios.get<UserPharmacyData[]>(`${user_url}/pharmacies/`);
};
