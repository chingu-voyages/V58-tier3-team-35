// src/hooks/useVoyagerCoordinates.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { SearchFilters } from "@/components/Search";

export function useVoyagerCoordinates(filters: SearchFilters) {
  return useQuery({
    queryKey: ["voyagers-coordinates", filters],
    queryFn: async () => {
      const res = await api.get("/coordinates", {
        params: filters,
      });

      return res.data;
    },
    staleTime: 1000 * 60,
  });
}
