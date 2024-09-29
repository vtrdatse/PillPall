import { useMutation, useQuery } from "react-query";
import {
  deleteSpecification,
  getSpecificationById,
  getSpecificationList,
  postCreateSpecification,
  putUpdateSpecification,
} from "../api/specification";

export const useGetSpecificationList = (params) =>
  useQuery("getSpecificationList", () => getSpecificationList(params), {
    refetchOnWindowFocus: false,
  });

export const useGetSpecificationById = (id) =>
  useQuery(["getSpecificationById", id], () => getSpecificationById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreateSpecification = () =>
  useMutation((body) => postCreateSpecification(body));

export const useUpdateSpecification = (id) =>
  useMutation((body) => putUpdateSpecification(id, body));

export const useDeleteSpecification = (id) =>
  useMutation(() => deleteSpecification(id));
