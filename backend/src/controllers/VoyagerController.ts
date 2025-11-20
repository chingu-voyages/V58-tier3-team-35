import { Request, Response } from "express";
import getVoyagersWithFilters from "../services/getVoyagers";
import Voyager from "@/models/Voyager";
import getVoyagerCoordinatesWithFilters from "@/services/getVoyagerCoordinates";

export async function getVoyagers(req: Request, res: Response) {
  try {
    const result = await getVoyagersWithFilters(req.query);

    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}

export async function getVoyagerCoordinates(req: Request, res: Response) {
  try {
    const result = await getVoyagerCoordinatesWithFilters(req.query);

    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}
