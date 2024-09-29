import axios from "axios";
import { refreshToken } from "../api/auth";
import {
  getRefreshTokenPayload,
  updateAuthStateFromStorage,
} from "./local-storage";

const axiosClient = axios.create({
  // baseURL: "https://pp-devtest2.azurewebsites.net",
  baseURL: "https://pillpal-be-1.onrender.com",
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const body = getRefreshTokenPayload();
        const newToken = (await refreshToken(body)).data;

        const newAccessToken = newToken.accessToken;
        const newRefreshToken = newToken.refreshToken;

        await updateAuthStateFromStorage(newAccessToken, newRefreshToken);
        axiosClient.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { axiosClient };
