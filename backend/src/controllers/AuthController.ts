import { activateUser, createVoyagerUser } from "@/services/authCreateVoyager";
import { getNewToken } from "@/services/authService";
import { jwtPayload } from "@/types/auth";
import { Request, Response } from "express";

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

export async function refreshToken(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const token = await getNewToken(req);
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
