import Voyager from "@/models/Voyager";

export const getDashboardData = async (params: any) => {
  const { page, limit, ...rest } = params;

  const [
    genderDistribution,
    countryDistribution,
    roleDistribution,
    sourceDistribution,
    goalDistribution,
  ] = await Promise.all([
    Voyager.aggregate([
      {
        $group: {
          _id: { $toLower: "$gender" },
          count: { $sum: 1 },
        },
      },
    ]),
    Voyager.aggregate([
      {
        $group: {
          _id: "$countryName",
          count: { $sum: 1 },
        },
      },
    ]),
    Voyager.aggregate([
      {
        $group: {
          _id: "$voyageRole",
          count: { $sum: 1 },
        },
      },
    ]),
    Voyager.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
        },
      },
    ]),
    Voyager.aggregate([
      {
        $group: {
          _id: "$goal",
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  return {
    genderDistribution,
    countryDistribution,
    roleDistribution,
    sourceDistribution,
    goalDistribution,
  };
};
