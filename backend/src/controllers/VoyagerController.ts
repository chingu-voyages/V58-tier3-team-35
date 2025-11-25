import { Request, Response } from "express";
import getVoyagersWithFilters from "../services/getVoyagers";
import Voyager from "@/models/Voyager";
import getVoyagerCoordinatesWithFilters from "@/services/getVoyagerCoordinates";
import getVoyagerById from "@/services/getVoyagerById";
import createVoyagerService from "@/services/createVoyager";

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

export async function getVoyager(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing voyager's ID" });
  }

  try {
    const result = await getVoyagerById(id);
    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}

export async function createVoyager(req: Request, res: Response) {
  try {
    const result = await createVoyagerService(req);
    if (Array.isArray(result)) {
      return res.status(400).json({ data: result });
    }
    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}
