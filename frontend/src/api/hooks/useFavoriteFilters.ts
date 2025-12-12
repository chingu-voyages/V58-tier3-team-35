import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export interface FavoriteFilter {
  _id: string;
  user: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export function useFavoriteFilters() {
  return useQuery<FavoriteFilter[]>({
    queryKey: ["favoriteFilters"],
    queryFn: async () => {
      const res = await api.get("/favorite-filter");
      return res.data;
    },
  });
}

export function useDeleteFavoriteFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/favorite-filter/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteFilters"] });
    },
  });
}
