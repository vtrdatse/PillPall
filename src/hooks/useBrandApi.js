import { useMutation, useQuery } from "react-query";
import {
  deleteBrand,
  getBrandById,
  getBrandList,
  postCreateBrand,
  updateBrand,
} from "../api/brand";

export const useGetBrandList = (params) =>
  useQuery("getBrandList", () => getBrandList(params), {
    refetchOnWindowFocus: false,
  });

export const useCreateBrand = () =>
  useMutation((body) => postCreateBrand(body));

export const useGetBrandById = (id) =>
  useQuery(["getBrandById", id], () => getBrandById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useDeleteBrand = (id) => useMutation(() => deleteBrand(id));

export const useUpdateBrand = (id) =>
  useMutation((body) => updateBrand(id, body));
