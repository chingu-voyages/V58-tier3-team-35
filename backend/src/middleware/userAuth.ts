import { jwtPayload } from "@/types/auth";
import { ACCESS_SECRET } from "@/utils/constants";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as jwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
