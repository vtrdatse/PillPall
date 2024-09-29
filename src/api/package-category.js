import { axiosClient } from "../utils/axios";

export const getPackageCategoryList = async () => {
  const res = await axiosClient.get(`/api/package-categories`);
  return res.data;
};

export const getPackageCategoryById = async (id) => {
  const res = await axiosClient.get(`/api/package-categories/${id}`);
  return res.data;
};

export const postCreatePackageCategory = async (data) => {
  const res = await axiosClient.post(`/api/package-categories`, data);
  return res.data;
};

export const putUpdatePackageCategory = async (id, data) => {
  const res = await axiosClient.put(`/api/package-categories/${id}`, data);
  return res.data;
};

export const deletePackageCategory = async (id) => {
  const res = await axiosClient.delete(`/api/package-categories/${id}`);
  return res.data;
};
