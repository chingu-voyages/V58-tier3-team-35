import Voyager from "@/models/Voyager";
import buildUserFilters from "@/utils/userFilters";
import { Response } from "express";

export const exportVoyagersService = async (params: any, res: Response) => {
  const { page, limit, ...rest } = params;
  const filters = buildUserFilters(rest);

  const cursor = Voyager.find(filters).cursor();

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="voyagers.csv"');

  res.write(
    "Timestamp,Gender,Country Code,Country Name,Timezone,Goal,Goal Other,Source,Source Other,Solo Project Tier,Role Type,Voyage Role,Voyage Signups,Voyage Tier\n"
  );

  for await (const doc of cursor) {
    const row = [
      doc.timestamp,
      doc.gender,
      doc.countryCode,
      doc.countryName,
      doc.timezone || "",
      doc.goal,
      doc.goalOther || "",
      doc.source,
      doc.sourceOther || "",
      doc.soloProjectTier,
      doc.roleType,
      doc.voyageRole,
      doc.voyageSignups || "",
      doc.voyageTier,
    ]
      .map((field) => `"${String(field).replace(/"/g, '""')}"`)
      .join(",");

    res.write(row + "\n");
  }

  res.end();
};
