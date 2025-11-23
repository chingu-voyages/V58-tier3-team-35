import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export default function useVoyagerDetails(id: string | null) {
  return useQuery({
    queryKey: ["voyager-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/voyager/${id}`);
      return res.data;
    },
  });
}
