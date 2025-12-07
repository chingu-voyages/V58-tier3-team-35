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
      { countryCode: ciExact(keyword) },
      { timezone: ciExact(keyword) },
      { goalOther: ciExact(keyword) },
      { sourceOther: ciExact(keyword) },
      { countryName: ciExact(keyword) },
      { voyageSignups: ciExact(keyword) },
      { voyageTier: ciExact(keyword) },
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
  filters.voyageRole = { $ne: "" };
  return filters;
}
