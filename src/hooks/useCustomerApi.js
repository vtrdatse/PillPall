import { useMutation, useQuery } from "react-query";
import {
  getCustomerById,
  getCustomerList,
  putLockCustomer,
  putUnlockCustomer,
} from "../api/customer";

export const useGetCustomerList = (params) =>
  useQuery(["getCustomerList"], () => getCustomerList(params), {
    refetchOnWindowFocus: false,
  });

export const useGetCustomerById = (id) =>
  useQuery(["getCustomerById", id], () => getCustomerById(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useLockCustomer = () => useMutation((id) => putLockCustomer(id));

export const useUnlockCustomer = () =>
  useMutation((id) => putUnlockCustomer(id));
