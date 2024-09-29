import { useMutation, useQuery } from "react-query";
import {
  deleteCategory,
  getCategoryById,
  getCategoryList,
  postCreateCategory,
  putUpdateCategory,
} from "../api/category";

export const useGetCategoryList = (params) =>
  useQuery(["getCategoryList", params], () => getCategoryList(params), {
    refetchOnWindowFocus: false,
  });

export const useGetCategoryById = (id) =>
  useQuery(["getCategoryById", id], () => getCategoryById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreateCategory = () =>
  useMutation((body) => postCreateCategory(body));

export const useUpdateCategory = (id) =>
  useMutation((body) => putUpdateCategory(id, body));

export const useDeleteCategory = (id) => useMutation(() => deleteCategory(id));
