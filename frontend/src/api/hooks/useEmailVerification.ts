import { useQuery } from "@tanstack/react-query";
import api from "../api";

export function useEmailVerification(token: string) {
  return useQuery({
    queryKey: ["verify-email", token],
    queryFn: async () => {
      const res = await api.get(`/auth/verify-email/${token}`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });
      return res.data;
    },
    enabled: !!token,
  });
}
