import { apiAuth } from "@/middleware/apiAuth";
import { rateLimiter } from "@/middleware/limiter";
import { Router } from "express";
import {
  login,
  refreshToken,
  register,
  resendVerificationToken,
  verifyEmail,
} from "@/controllers/AuthController";
import userAuth from "@/middleware/userAuth";

const authRouter = Router();

authRouter.get("/resend-verification", userAuth, resendVerificationToken);

authRouter.use(apiAuth);

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.get("/refresh", refreshToken);
export default authRouter;
