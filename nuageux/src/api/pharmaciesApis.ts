import { IPanigation, PharmacyData } from "@/types/dataTypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;

export const getPharmacies = ({
  page = 1,
  nameFilter = "",
  zoneFilter = "",
}) => {
  return axios.get<IPanigation<PharmacyData>>(
    `${url}/pharmacies/?page=${page}&name=${nameFilter}`
  );
};

export const activatePharmacy = (id: string) => {
  return axios.post<PharmacyData>(`${url}/pharmacies/${id}/activate/`);
};

export const deactivatePharmacy = (id: string) => {
  return axios.post<PharmacyData>(`${url}/pharmacies/${id}/deactivate/`);
};
