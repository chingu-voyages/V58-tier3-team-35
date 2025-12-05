import { useMutation } from "@tanstack/react-query";
import api from "../api";

export interface SignupPayload {
  email: string;
  password: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const res = await api.post("/auth/register", payload);
      return res.data;
    },
  });
}
