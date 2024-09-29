import { axiosClient } from "../utils/axios";

export const getPharmaceuticalList = async (params) => {
  const res = await axiosClient.get("/api/pharmaceutical-companies", {
    params,
  });
  return res.data.data;
};

export const getPharmaceuticalById = async (id) => {
  const res = await axiosClient.get(`/api/pharmaceutical-companies/${id}`);
  return res.data;
};

export const postCreatePharmaceutical = async (body) => {
  const res = await axiosClient.post("/api/pharmaceutical-companies", body);
  return res.data;
};

export const putUpdatePharmaceutical = async (id, body) => {
  const res = await axiosClient.put(
    `/api/pharmaceutical-companies/${id}`,
    body
  );
  return res.data;
};

export const deletePharmaceutical = async (id) => {
  const res = await axiosClient.delete(`/api/pharmaceutical-companies/${id}`);
  return res.data;
};
