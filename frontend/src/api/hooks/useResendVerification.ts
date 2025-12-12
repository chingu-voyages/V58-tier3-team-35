import { useQuery } from "@tanstack/react-query";
import api from "../api";

export function useResendVerification(resend: boolean) {
  return useQuery({
    queryKey: ["resend-verification"],
    queryFn: async () => {
      const res = await api.get(`/auth/resend-verification`, {});
      return res.data;
    },
    enabled: resend,
  });
}
