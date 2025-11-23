function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ciExact(value: string) {
  return { $regex: `^${escapeRegex(value)}$`, $options: "i" };
}

export default function buildUserFilters(query: any) {
  const filters: any = {};
  if (query.search) {
    const keyword = query.search;

    filters.$or = [
      { countryCode: { $regex: keyword, $options: "i" } },
      { timezone: { $regex: keyword, $options: "i" } },
      { goalOther: { $regex: keyword, $options: "i" } },
      { sourceOther: { $regex: keyword, $options: "i" } },
      { countryName: { $regex: keyword, $options: "i" } },
      { voyageSignups: { $regex: keyword, $options: "i" } },
      { voyageTier: { $regex: keyword, $options: "i" } },
    ];
  }

  if (query.soloProjectTier) {
    filters.soloProjectTier = ciExact(query.soloProjectTier);
  }

  if (query.gender) {
    filters.gender = ciExact(query.gender);
  }

  if (query.source) {
    filters.source = ciExact(query.source);
  }

  if (query.voyageRole) {
    filters.voyageRole = ciExact(query.voyageRole);
  }

  if (query.roleType) {
    filters.roleType = ciExact(query.roleType);
  }
  filters.voyageRole = { $ne: ["", null] };
  return filters;
}
