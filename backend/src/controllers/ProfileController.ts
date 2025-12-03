import { getUserProfile } from "@/services/authProfile";
import { jwtPayload } from "@/types/auth";
import { Request, Response } from "express";

export async function getProfile(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { email } = req.user as jwtPayload;
    if (!email) {
      throw new Error("User not found");
    }
    const user = await getUserProfile(email);
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
