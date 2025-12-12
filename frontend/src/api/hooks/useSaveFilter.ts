import { useMutation } from "@tanstack/react-query";
import api from "../api";

interface SaveFilterPayload {
  name: string;
  filters: string;
}

export function useSaveFilter() {
  return useMutation({
    mutationFn: async (payload: SaveFilterPayload) => {
      const res = await api.post("/favorite-filter", payload);
      return res.data;
    },
  });
}
