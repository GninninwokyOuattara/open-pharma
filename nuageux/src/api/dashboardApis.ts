import {
  PharmaciesAllStatesResponse,
  RecentActivities,
} from "@/types/apiTypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;
export const getPharmaciesAllStatesForPieChart = () => {
  return axios.get<PharmaciesAllStatesResponse>(
    `${url}/dashboard/pharmacies-states/`
  );
};

export const getRecentActivity = () => {
  return axios.get<RecentActivities>(`${url}/dashboard/get-recent-activity/`);
};
