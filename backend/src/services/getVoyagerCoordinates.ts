import Voyager from "@/models/Voyager";
import buildUserFilters from "@/utils/userFilters";

export default function getVoyagerCoordinatesWithFilters(params: any) {
  const { ...rest } = params;
  const filters = buildUserFilters(rest);

  return Voyager.find(filters).select("_id lat lng");
}
