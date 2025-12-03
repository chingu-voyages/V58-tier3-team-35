import { apiAuth } from "@/middleware/apiAuth";
import { rateLimiter } from "@/middleware/limiter";
import { Router } from "express";
import { register } from "@/controllers/AuthController";

const authRouter = Router();

authRouter.use(rateLimiter);
authRouter.use(apiAuth);

authRouter.post("/register", register);

export default authRouter;
