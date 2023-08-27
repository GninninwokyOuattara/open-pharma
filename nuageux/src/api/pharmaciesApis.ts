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
