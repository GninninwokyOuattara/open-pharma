import { ReviewSuccessResponse } from "@/types/apiTypes";
import { IPanigation, PharmacyBaseData } from "@/types/datatypes";
import axios from "axios";

export const acceptPharmacyPendingReview = (id: string) => {
  return axios.post<ReviewSuccessResponse>(
    `http://localhost:8080/admin-api/pharmacies-pending-review/${id}/accept/`
  );
};

export const rejectPharmacyPendingReview = (id: string) => {
  return axios.post<ReviewSuccessResponse>(
    `http://localhost:8080/admin-api/pharmacies-pending-review/${id}/reject/`
  );
};

export const getPendingReviewsPharmacies = (nameFilter = "", page = 1) =>
  axios.get<IPanigation<PharmacyBaseData>>(
    `http://localhost:8080/admin-api/pharmacies-pending-review?name=${nameFilter}&page=${page}`
  );
