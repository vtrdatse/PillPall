import { useMutation, useQuery } from "react-query";
import { authAdmin, postLogin } from "../api/auth";

export const useLogin = () => useMutation((body) => postLogin(body));

export const useAuthAdmin = () => useQuery("authAdmin", () => authAdmin());
