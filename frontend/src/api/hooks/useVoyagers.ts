import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { SearchFilters } from "@/components/Search";

export function useVoyagers(filters: SearchFilters, page: number = 1) {
  return useQuery({
    queryKey: ["voyagers", filters, page],
    queryFn: async () => {
      const res = await api.get("/voyagers", {
        params: { ...filters, page },
      });
      return res.data;
    },
    staleTime: 1000 * 60,
  });
}
