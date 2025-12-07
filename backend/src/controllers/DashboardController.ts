import { Request, Response } from "express";
import { getDashboardData } from "@/services/dashboardService";

export async function getDashboard(req: Request, res: Response) {
  try {
    const data = await getDashboardData(req.query);
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}
