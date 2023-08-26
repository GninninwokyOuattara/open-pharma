import axios from "axios";

export const login = (username: string, password: string) => {
  return axios.post<any, { token: string; refreshToken: string }, any>(
    "localhost:8080/admin-api/auth/",
    {
      username,
      password,
    }
  );
};

export const refreshToken = () => {
  const refreshToken = localStorage.getItem("oph-refresh-token");
  return axios.post("localhost:8080/admin-api/refresh/", {
    refreshToken,
  });
};
