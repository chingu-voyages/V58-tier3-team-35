import { apiAuth } from "@/middleware/apiAuth";
import { rateLimiter } from "@/middleware/limiter";
import { Router } from "express";
import {
  refreshToken,
  register,
  verifyEmail,
} from "@/controllers/AuthController";

const authRouter = Router();

authRouter.use(rateLimiter);
authRouter.use(apiAuth);

authRouter.post("/register", register);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.get("/refresh", refreshToken);
export default authRouter;
