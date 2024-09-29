import { useMutation, useQuery } from "react-query";
import {
  deleteNation,
  getNationById,
  getNationList,
  postCreateNation,
  updateNation,
} from "../api/nation";

export const useGetNationList = (params) =>
  useQuery(["getNationList"], () => getNationList(params), {
    refetchOnWindowFocus: false,
  });

export const useGetNationById = (id) =>
  useQuery(["getNationById", id], () => getNationById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreateNation = () =>
  useMutation((body) => postCreateNation(body));

export const useUpdateNation = (id) =>
  useMutation((body) => updateNation(id, body));

export const useDeleteNation = (id) => useMutation(() => deleteNation(id));
