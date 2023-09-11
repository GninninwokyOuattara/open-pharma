import { PharmaciesAllStatesResponse } from "@/types/apiTypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;
export const getPharmaciesAllStatesForPieChart = () => {
  return axios.get<PharmaciesAllStatesResponse>(
    `${url}/dashboard/pharmacies-states/`
  );
};
