import { administratorEndpoint } from "@/constants/endpoint";
import {
  BatchReviewQueryData,
  BatchReviewResponse,
  ReviewSuccessResponse,
} from "@/types/apiTypes";
import { IPanigation, PharmacyBaseData } from "@/types/dataTypes";
import axios from "axios";

export const acceptPharmacyPendingReview = (id: string) => {
  return axios.post<ReviewSuccessResponse>(
    `${administratorEndpoint}/pharmacies-pending-review/${id}/accept/`
  );
};

export const rejectPharmacyPendingReview = (id: string) => {
  return axios.post<ReviewSuccessResponse>(
    `${administratorEndpoint}/pharmacies-pending-review/${id}/reject/`
  );
};

export const getPendingReviewsPharmacies = (
  nameFilter = "",
  openFilter = "",
  page = 1
) =>
  axios.get<IPanigation<PharmacyBaseData>>(
    `${administratorEndpoint}/pharmacies-pending-review?name=${nameFilter}&open=${openFilter}&page=${page}`
  );

export const batchReviewPharmacies = (data: BatchReviewQueryData) => {
  return axios.post<BatchReviewResponse>(
    `${administratorEndpoint}/pharmacies-pending-review/batch-review/`,
    data
  );
};
