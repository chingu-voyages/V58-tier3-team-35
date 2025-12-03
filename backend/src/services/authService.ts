import UserAccount from "@/models/UserAccount";
import { generateAccessToken } from "@/utils/jwt";

export async function getNewToken(req: any) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new Error("Unauthorized");

  const user = await UserAccount.findOne({ refreshToken });
  if (!user) throw new Error("Unauthorized");

  const accessToken = generateAccessToken({ email: user.email });
  return accessToken;
}
