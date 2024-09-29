import { useMutation, useQuery } from "react-query";
import {
  deleteActiveIngredient,
  getActiveIngredientById,
  getActiveIngredientList,
  postCreateActiveIngredient,
  putUpdateActiveIngredient,
} from "../api/active-ingredient";

export const useGetActiveIngredientList = (params) =>
  useQuery(["getActiveIngredientList"], () => getActiveIngredientList(params), {
    refetchOnWindowFocus: false,
  });

export const useGetActiveIngredientById = (id) =>
  useQuery(["getActiveIngredientById", id], () => getActiveIngredientById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreateActiveIngredient = () =>
  useMutation((body) => postCreateActiveIngredient(body));

export const useUpdateActiveIngredient = (id) =>
  useMutation((body) => putUpdateActiveIngredient(id, body));

export const useDeleteActiveIngredient = (id) =>
  useMutation(() => deleteActiveIngredient(id));
