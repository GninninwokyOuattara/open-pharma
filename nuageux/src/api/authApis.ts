import { ResponseRefreshTokenDataSuccess } from "@/types/apiTypes";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_ADDRESS;

export const login = (username: string, password: string) => {
  return axios.post<any, { token: string; refreshToken: string }, any>(
    `${url}/auth/`,
    {
      username,
      password,
    }
  );
};

export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("oph-refresh-token");
  return axios.post<ResponseRefreshTokenDataSuccess>(`http://${url}/refresh/`, {
    refresh: refreshToken,
  });
};
