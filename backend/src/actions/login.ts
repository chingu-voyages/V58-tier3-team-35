import { UserAccount, UserAccountDocument } from "@/models/UserAccount";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { Response } from "express";

export const login = async (
  res: Response,
  user: UserAccountDocument
): Promise<{ accessToken: string }> => {
  const refreshToken = generateRefreshToken({ email: user.email });
  const accessToken = generateAccessToken({ email: user.email });
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken };
};
