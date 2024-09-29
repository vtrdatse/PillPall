import { axiosClient } from "../utils/axios";

export const getManagerList = async () => {
  const res = await axiosClient.get("/api/accounts/manager");
  return res.data;
};

export const postCreateManager = async (body) => {
  const res = await axiosClient.post("/api/accounts/manager", body);
  return res.data;
};
