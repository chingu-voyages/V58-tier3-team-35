import {
  createVoyager,
  getVoyager,
  getVoyagerCoordinates,
  getVoyagers,
} from "@/controllers/VoyagerController";
import { apiAuth } from "@/middleware/apiAuth";
import { createChatResponse } from "@/controllers/chatController";
import { Router } from "express";
import { rateLimiter } from "@/middleware/limiter";

const voyagerRouter = Router();

voyagerRouter.use(apiAuth);

voyagerRouter.get("/voyagers", getVoyagers);
voyagerRouter.get("/coordinates", getVoyagerCoordinates);
voyagerRouter.get("/voyager/:id", getVoyager);
voyagerRouter.post("/new-voyager", createVoyager);

export default voyagerRouter;
