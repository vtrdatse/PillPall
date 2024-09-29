import { useMutation, useQuery } from "react-query";
import {
  deleteDosage,
  getDosageById,
  getDosageList,
  postCreateDosage,
  updateDosage,
} from "../api/dosage";

export const useGetDosageList = (params) =>
  useQuery("getDosageList", () => getDosageList(params), {
    refetchOnWindowFocus: false,
  });

export const useGetDosageById = (id) =>
  useQuery(["getDosageById", id], () => getDosageById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreateDosage = () =>
  useMutation((body) => postCreateDosage(body));

export const useUpdateDosage = (id) =>
  useMutation((body) => updateDosage(id, body));

export const useDeleteDosage = (id) => useMutation(() => deleteDosage(id));
