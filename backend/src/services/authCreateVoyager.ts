import { login } from "@/actions/login";
import { validateInput } from "@/actions/registrationAction";
import sendActivationEmail from "@/actions/sendActivationEmail";
import UserAccount from "@/models/UserAccount";
import { userAccountInput } from "@/types/userAccountTypes";
import { hashPassword } from "@/utils/hash";
import transaction from "@/utils/transaction";
import { Response } from "express";
import { ClientSession } from "mongoose";

export async function createVoyagerUser(req: userAccountInput, res: Response) {
  const validated = await validateInput(req);
  const hashedPassword = await hashPassword(validated.password);
  validated.password = hashedPassword;
  const user = new UserAccount(validated);
  await user.save();

  const token = await sendActivationEmail(user);

  user.pendingMail = false;
  await user.save();
  const tokens = await login(res, user);

  return { user, tokens };
}
