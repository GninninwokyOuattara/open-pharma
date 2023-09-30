import { administratorEndpoint } from "@/constants/endpoint";
import {
  PharmaciesAllStatesResponse,
  RecentActivities,
} from "@/types/apiTypes";
import axios from "axios";

export const getPharmaciesAllStatesForPieChart = () => {
  return axios.get<PharmaciesAllStatesResponse>(
    `${administratorEndpoint}/dashboard/pharmacies-states/`
  );
};

export const getRecentActivity = () => {
  return axios.get<RecentActivities>(
    `${administratorEndpoint}/dashboard/get-recent-activity/`
  );
};
