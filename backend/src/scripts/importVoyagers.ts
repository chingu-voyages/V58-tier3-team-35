import data from "@/data/voyagers.json";
import User from "@/models/Voyager";
import { Request, Response } from "express";

export default function importVoyagers(req: Request, res: Response) {
  const filtered = data.filter(
    (item) => item.countryName !== "" && item.countryCode !== ""
  );
  const BATCH_SIZE = 500;
  async function run() {
    try {
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);

        await User.insertMany(batch, { ordered: false });

        console.log(
          `Inserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${
            batch.length
          } records)`
        );
      }
    } catch (err) {
      console.error("Insert failed");
    }
  }
  run();
  res.json({
    data: filtered.length,
  });
}
