import { createVoyagerUser } from "@/services/authCreateVoyager";
import { Request, Response } from "express";

export async function register(req: Request, res: Response): Promise<Response> {
  try {
    const user = await createVoyagerUser(req.body, res);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
