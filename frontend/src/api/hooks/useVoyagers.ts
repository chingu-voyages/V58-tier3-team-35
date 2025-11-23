import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/api/api";
import type { SearchFilters } from "@/components/Search";

export function useVoyagers(filters: SearchFilters) {
  return useInfiniteQuery({
    queryKey: ["voyagers", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get("/voyagers", {
        params: { ...filters, page: pageParam },
      });
      return res.data;
    },
    getNextPageParam: (lastPage: any) => {
      return lastPage.data.hasNextPage ? lastPage.data.nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}
