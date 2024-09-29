import { axiosClient } from "../utils/axios";

export const getPackageCategoryList = async (IsDeleted = false) => {
    const res = await axiosClient.get("/api/package-categories", {
        params: { IsDeleted }
    });
    return res.data;
}

export const getPackageCategoryById = async (id) => {
    const res = await axiosClient.get(`/api/package-categories/${id}`);
    return res.data;
}

export const postCreatePackageCategory = async (body) => {
    const res = await axiosClient.post("/api/package-categories", body);
    return res.data;
}

export const putUpdatePackageCategory = async (id, body) => {
    const res = await axiosClient.put(`/api/package-categories/${id}`, body);
    return res.data;
}

export const deletePackageCategory = async (id) => {
    const res = await axiosClient.delete(`/api/package-categories/${id}`);
    return res.data;
}
