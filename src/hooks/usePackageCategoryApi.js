import { useMutation, useQuery } from "react-query";
import {
  deletePackageCategory,
  getPackageCategoryById,
  getPackageCategoryList,
  postCreatePackageCategory,
  putUpdatePackageCategory,
} from "../api/package-category";

export const useGetPackageCategoryList = () =>
  useQuery("getPackageCategoryList", () => getPackageCategoryList(), {
    refetchOnWindowFocus: false,
  });

export const useGetPackageCategoryById = (id) =>
  useQuery(["getPackageCategoryById", id], () => getPackageCategoryById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreatePackageCategory = () =>
  useMutation((body) => postCreatePackageCategory(body));

export const useUpdatePackageCategory = (id) =>
  useMutation((body) => putUpdatePackageCategory(id, body));

export const useDeletePackageCategory = (id) =>
  useMutation(() => deletePackageCategory(id));
