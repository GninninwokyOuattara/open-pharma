import {
  ResponseLoginDataSuccess,
  ResponseRefreshTokenDataSuccess,
} from "@/types/apiTypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;

export const authenticate = (username: string, password: string) => {
  return axios.post<ResponseLoginDataSuccess>(`${url}/auth/`, {
    username,
    password,
  });
};

export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("oph-refresh-token");
  return axios.post<ResponseRefreshTokenDataSuccess>(`${url}/refresh/`, {
    refresh: refreshToken,
  });
};
