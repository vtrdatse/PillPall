import { axiosClient } from "../utils/axios";

export const getSpecificationList = async (params) => {
  const res = await axiosClient.get("/api/specifications", { params });
  return res.data.data;
};

export const postCreateSpecification = async (body) => {
  const res = await axiosClient.post("/api/specifications", body);
  return res.data;
};

export const getSpecificationById = async (id) => {
  const res = await axiosClient.get(`/api/specifications/${id}`);
  return res.data;
};

export const putUpdateSpecification = async (id, body) => {
  const res = await axiosClient.put(`/api/specifications/${id}`, body);
  return res.data;
};

export const deleteSpecification = async (id) => {
  const res = await axiosClient.delete(`/api/specifications/${id}`);
  return res.data;
};
