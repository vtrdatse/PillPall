import { useMutation, useQuery } from "react-query";
import { getManagerList, postCreateManager } from "../api/manager";

export const useGetManagerList = () =>
  useQuery("getManagerList", () => getManagerList(), {
    refetchOnWindowFocus: false,
  });

export const useCreateManager = () =>
  useMutation((body) => postCreateManager(body));
