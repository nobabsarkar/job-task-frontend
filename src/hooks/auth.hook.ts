import {
  getMe,
  userLogin,
  userLogout,
  userRefreshToken,
  userRegistration,
} from "@/api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: userRefreshToken,
  });
}
