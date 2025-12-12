import { Router } from "express";
import { getDashboard } from "@/controllers/DashboardController";
import { apiAuth } from "@/middleware/apiAuth";
import userAuth from "@/middleware/userAuth";

const dashboardRouter = Router();

dashboardRouter.use(apiAuth);
dashboardRouter.use(userAuth);

dashboardRouter.get("/", getDashboard);

export default dashboardRouter;
