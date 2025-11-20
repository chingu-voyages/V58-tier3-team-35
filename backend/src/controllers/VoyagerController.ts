import { Request, Response } from "express";
import getVoyagersWithFilters from "../services/getVoyagers";
import Voyager from "@/models/Voyager";

export async function getVoyagers(req: Request, res: Response) {
  try {
    const result = await getVoyagersWithFilters(req.query);

    res.status(200).json({ data: result });
  } catch (error: unknown) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}
