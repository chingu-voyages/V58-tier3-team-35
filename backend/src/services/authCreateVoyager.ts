import { login } from "@/actions/login";
import { validateInput } from "@/actions/registrationAction";
import sendActivationEmail from "@/actions/sendActivationEmail";

import UserAccount from "@/models/UserAccount";
import { userAccountInput } from "@/types/userAccountTypes";
import { EMAIL_TOKEN_SECRET } from "@/utils/constants";
import { hashPassword } from "@/utils/hash";
import { Response } from "express";
import jwt from "jsonwebtoken";

export async function createVoyagerUser(req: userAccountInput, res: Response) {
  const validated = await validateInput(req);
  const hashedPassword = await hashPassword(validated.password);
  validated.password = hashedPassword;
  const user = new UserAccount(validated);

  await user.save();
  await sendActivationEmail(user);
  user.pendingMail = false;
  await user.save();
  const tokens = await login(res, user);

  const userObj: any = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken: tokens.accessToken };
}

export async function activateUser(token: string) {
  const user = jwt.verify(token, EMAIL_TOKEN_SECRET) as { email: string };

  if (!user) {
    throw new Error("Invalid Token!");
  }

  const userAccount = await UserAccount.findOne({ email: user.email });
  if (!userAccount) {
    throw new Error("Invalid token!");
  }

  if (userAccount.isVerified) {
    throw new Error("Account is already verified!");
  }

  userAccount.isVerified = true;
  await userAccount.save();

  return userAccount;
}
