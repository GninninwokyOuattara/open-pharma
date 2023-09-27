import {
  BatchReviewQueryData,
  BatchReviewResponse,
  ReviewSuccessResponse,
} from "@/types/apiTypes";
import { IPanigation, PharmacyBaseData } from "@/types/dataTypes";
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

export const getPendingReviewsPharmacies = (
  nameFilter = "",
  openFilter = "",
  page = 1
) =>
  axios.get<IPanigation<PharmacyBaseData>>(
    `${url}/pharmacies-pending-review?name=${nameFilter}&open=${openFilter}&page=${page}`
  );

export const batchReviewPharmacies = (data: BatchReviewQueryData) => {
  return axios.post<BatchReviewResponse>(
    `${url}/pharmacies-pending-review/batch-review/`,
    data
  );
};
