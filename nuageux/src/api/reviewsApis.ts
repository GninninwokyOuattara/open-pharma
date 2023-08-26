import { ReviewSuccessResponse } from "@/types/apiTypes";
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
