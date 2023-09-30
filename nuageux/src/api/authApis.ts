import {
  ResponseLoginDataSuccess,
  ResponseRefreshTokenDataSuccess,
} from "@/types/apiTypes";
import axios from "axios";

import { administratorEndpoint } from "@/constants/endpoint";

export const authenticate = (username: string, password: string) => {
  return axios.post<ResponseLoginDataSuccess>(
    `${administratorEndpoint}/auth/`,
    {
      username,
      password,
    }
  );
};

export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("oph-refresh-token");
  return axios.post<ResponseRefreshTokenDataSuccess>(
    `${administratorEndpoint}/refresh/`,
    {
      refresh: refreshToken,
    }
  );
};
