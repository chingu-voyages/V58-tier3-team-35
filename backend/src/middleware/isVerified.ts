import UserAccount from "@/models/UserAccount";
import { NextFunction, Request, Response } from "express";

export default async function isVerified(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.user;
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const user = await UserAccount.findOne({ email: session.email });
  if (!user)
    return res
      .status(404)
      .json({ message: "User account could not be found!" });
  if (!user.isVerified) {
    return res.status(403).json({
      message: "Account is not verified. Please verify to perform this action!",
    });
  }
  next();
}
