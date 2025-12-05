import { useMutation } from "@tanstack/react-query";
import api from "../api";

export interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/auth/login", payload);
      return res.data;
    },
  });
}
