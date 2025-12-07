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
    const exact = new RegExp(`^${keyword}$`, "i");
    filters.$or = [
      { countryCode: exact },
      { timezone: exact },
      { goalOther: exact },
      { sourceOther: exact },
      { countryName: exact },
      { voyageSignups: exact },
      { voyageTier: exact },
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
