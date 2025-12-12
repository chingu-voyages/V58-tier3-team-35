import { Request, Response, NextFunction } from "express";

export function apiAuth(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers["x-api-key"];

  if (!key || key !== process.env.APP_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  next();
}
