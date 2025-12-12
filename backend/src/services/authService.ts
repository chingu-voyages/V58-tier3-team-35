import { login } from "@/actions/login";
import sendActivationEmail from "@/actions/sendActivationEmail";
import UserAccount from "@/models/UserAccount";
import { comparePassword } from "@/utils/hash";
import { generateAccessToken } from "@/utils/jwt";
import { Response } from "express";

export async function loginService(req: any, res: Response) {
  const { email, password } = req;

  const user = await UserAccount.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid login credentials");

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) throw new Error("Invalid login credentials");

  const accessToken = await login(res, user);
  const userObj: any = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken };
}

export async function getNewToken(req: any) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new Error("Unauthorized");

  const user = await UserAccount.findOne({ refreshToken });
  if (!user) throw new Error("Unauthorized");

  const accessToken = generateAccessToken({ email: user.email });
  return accessToken;
}

export async function resendVerification(email: string) {
  const user = await UserAccount.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.isVerified) throw new Error("Acccount is verified");

  await sendActivationEmail(user);
  return user;
}
