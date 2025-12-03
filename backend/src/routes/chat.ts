import { createChatResponse } from "@/controllers/chatController";
import { rateLimiter } from "@/middleware/limiter";
import { Router } from "express";
const chatRouter = Router();
chatRouter.post("/chat", createChatResponse);

export default chatRouter;
