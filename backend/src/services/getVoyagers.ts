import Voyager from "@/models/Voyager";
import buildUserFilters from "@/utils/userFilters";

export default function getVoyagersWithFilters(params: any) {
  const { page = 1, limit = 20, ...rest } = params;
  const filters = buildUserFilters(rest);

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort: { createdAt: -1 },
  };
  return Voyager.paginate(filters, options);
}
