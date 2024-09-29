import { axiosClient } from "../utils/axios";

export const getBrandList = async ({ params }) => {
  const res = await axiosClient.get("/api/brands", { params });
  return res.data;
};

export const postCreateBrand = async (body) => {
  const res = await axiosClient.post("/api/brands", body);
  return res.data;
};

export const getBrandById = async (id) => {
  const res = await axiosClient.get(`/api/brands/${id}`);
  return res.data;
};

export const deleteBrand = async (id) => {
  const res = await axiosClient.delete(`/api/brands/${id}`);
  return res.data;
};

export const updateBrand = async (id, body) => {
  const res = await axiosClient.put(`/api/brands/${id}`, body);
  return res.data;
};
