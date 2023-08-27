import { ReviewSuccessResponse } from "@/types/apiTypes";
import { IPanigation, PharmacyBaseData } from "@/types/datatypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;

export const acceptPharmacyPendingReview = (id: string) => {
  return axios.post<ReviewSuccessResponse>(
    `${url}/pharmacies-pending-review/${id}/accept/`
  );
};

export const rejectPharmacyPendingReview = (id: string) => {
  return axios.post<ReviewSuccessResponse>(
    `${url}/pharmacies-pending-review/${id}/reject/`
  );
};

export const getPendingReviewsPharmacies = (nameFilter = "", page = 1) =>
  axios.get<IPanigation<PharmacyBaseData>>(
    `${url}/pharmacies-pending-review?name=${nameFilter}&page=${page}`
  );
