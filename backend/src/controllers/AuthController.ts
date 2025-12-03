import { activateUser, createVoyagerUser } from "@/services/authCreateVoyager";
import { jwtPayload } from "@/types/auth";
import { Request, Response } from "express";
import { jwt } from "jsonwebtoken";

export async function register(req: Request, res: Response): Promise<Response> {
  try {
    const user = await createVoyagerUser(req.body, res);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function verifyEmail(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { token } = req.params;
    const user = await activateUser(token as string);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
