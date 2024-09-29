import { axiosClient } from "../utils/axios";

export const getTosList = async () => {
    const res = await axiosClient.get("/api/terms-of-services");
    return res.data;
}

export const getTosById = async (id) => {
    const res = await axiosClient.get(`/api/terms-of-services/${id}`);
    return res.data;
}

export const postCreateTos = async (data) => {
    const res = await axiosClient.post("/api/terms-of-services", data);
    return res.data;
}

export const putUpdateTos = async (id, data) => {
    const res = await axiosClient.put(`/api/terms-of-services/${id}`, data);
    return res.data;
}   

export const deleteTos = async (id) => {
    const res = await axiosClient.delete(`/api/terms-of-services/${id}`);
    return res.data;
}
