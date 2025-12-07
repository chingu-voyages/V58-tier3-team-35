import { useQuery } from "@tanstack/react-query";
import api from "../api";

export interface DistributionItem {
  _id: string;
  count: number;
}

export interface DashboardData {
  genderDistribution: DistributionItem[];
  countryDistribution: DistributionItem[];
  roleDistribution: DistributionItem[];
  sourceDistribution: DistributionItem[];
  goalDistribution: DistributionItem[];
}

export interface DashboardResponse {
  data: DashboardData;
}

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get<DashboardResponse>("/dashboard");
      return res.data;
    },
  });
}
