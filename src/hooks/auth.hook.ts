import { getMe, userLogin, userRegistration } from "@/api/auth.api";
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

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
