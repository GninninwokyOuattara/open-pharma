import { AxiosResponse } from "axios";
import { PharmacyBaseData } from "./dataTypes";

export interface ResponseRefreshTokenDataSuccess {
  access: string;
}

export interface ResponseRefreshTokenDataError {
  detail: string;
}

export interface ResponseLoginDataSuccess
  extends ResponseRefreshTokenDataSuccess {
  refresh: string;
}

export interface ResponseLoginDataError extends ResponseRefreshTokenDataError {
  code: string;
}

export interface RefreshTokenResponse
  extends AxiosResponse<
    ResponseRefreshTokenDataSuccess,
    ResponseRefreshTokenDataError
  > {}

// REVIEWS RESPONSE TYPES
export interface ReviewSuccessResponse {
  message: string;
  data: PharmacyBaseData;
}

// DASHBOARD

export interface PharmaciesAllStatesResponse {
  total: number;
  actives: number;
  inactives: number;
  actives_reviewed: number;
  inactives_reviewed: number;
  inactives_pending_review: number;
  actives_open: number;
  actives_not_open: number;
  inactives_reviewed_open: number;
  inactives_reviewed_not_open: number;
  inactives_pending_review_open: number;
  inactives_pending_review_not_open: number;
}

export interface RecentActivity {
  id: string;
  type: "review" | "state" | "actualization";
  action: string;
  description: string;
  date_created: string;
}

export type RecentActivities = RecentActivity[];
