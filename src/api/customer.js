import { axiosClient } from "../utils/axios";

export const getCustomerList = async (params) => {
  const res = await axiosClient.get("/api/accounts/customer", { params });
  return res.data.data;
};

export const getCustomerById = async (id) => {
  const res = await axiosClient.get(`/api/accounts/customer/${id}`);
  return res.data;
};

export const putLockCustomer = async (id) => {
  const res = await axiosClient.put(`/api/accounts/customer/${id}/lock`);
  return res.data;
};

export const putUnlockCustomer = async (id) => {
  const res = await axiosClient.put(`/api/accounts/customer/${id}/unlock`);
  return res.data;
};
