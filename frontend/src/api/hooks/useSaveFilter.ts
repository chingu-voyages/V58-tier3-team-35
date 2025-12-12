import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

interface SaveFilterPayload {
  name: string;
  filters: string;
}

export function useSaveFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveFilterPayload) => {
      const res = await api.post("/favorite-filter", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteFilters"] });
    },
  });
}
