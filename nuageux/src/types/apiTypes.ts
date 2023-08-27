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
