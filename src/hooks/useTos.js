import { useMutation, useQuery } from "react-query";
import {
    deleteTos,
    getTosById,
    getTosList,
    postCreateTos,
    putUpdateTos,
} from "../api/terms-of-services";

export const useGetTosList = () => {
    return useQuery("getTosList", getTosList);
};

export const useGetTosById = (id) => {
    return useQuery(["getTosById", id], () => getTosById(id));
};

export const useCreateTos = () => {
    return useMutation(postCreateTos);
};

export const useUpdateTos = (id) => {
    return useMutation((data) => putUpdateTos(id, data));
};

export const useDeleteTos = (id) => {
    return useMutation(() => deleteTos(id));
};