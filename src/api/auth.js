import { axiosClient } from "../utils/axios";

export const postLogin = async (body) => {
  const res = await axiosClient.post(`/api/auths/login`, body);
  return res;
};

export const authAdmin = async () => {
  const res = await axiosClient.get("/api/test-auths/admin-only");
  return res;
};

export const refreshToken = async (body) => {
  const res = await axiosClient.post("/api/auths/refresh-token", body);
  return res;
};
