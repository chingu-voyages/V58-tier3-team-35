import { getProfile } from "@/controllers/ProfileController";
import userAuth from "@/middleware/userAuth";
import { profile } from "console";
import { Router } from "express";

const profileRouter = Router();

profileRouter.use(userAuth);

profileRouter.get("/", getProfile);

export default profileRouter;
