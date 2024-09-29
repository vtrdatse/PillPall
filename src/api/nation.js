import { axiosClient } from "../utils/axios";

export const getNationList = async (params) => {
  const res = await axiosClient.get("/api/nations", { params });
  return res.data;
};

export const getNationById = async (id) => {
  const res = await axiosClient.get(`/api/nations/${id}`);
  return res.data;
};

export const postCreateNation = async (body) => {
  const res = await axiosClient.post("/api/nations", body);
  return res.data;
};

export const updateNation = async (id, body) => {
  const res = await axiosClient.put(`/api/nations/${id}`, body);
  return res.data;
};

export const deleteNation = async (id) => {
  const res = await axiosClient.delete(`/api/nations/${id}`);
  return res.data;
};
