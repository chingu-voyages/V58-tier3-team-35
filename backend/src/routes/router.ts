import {
  createVoyager,
  getVoyager,
  getVoyagerCoordinates,
  getVoyagers,
} from "@/controllers/VoyagerController";
import { apiAuth } from "@/middleware/apiAuth";
import { createChatResponse} from "@/controllers/chatController";
import { Router } from "express";
import { rateLimiter } from "@/middleware/limiter";

const router = Router();

// router.use(apiAuth);

router.get("/", (req, res) => {
  console.log(req);
  res.json({
    app_version: "1.0.0",
  });
});

router.get("/voyagers", getVoyagers);
router.get("/coordinates", getVoyagerCoordinates);
router.get("/voyager/:id", getVoyager);
router.post("/new-voyager", createVoyager);
router.post("/chat", rateLimiter, createChatResponse);

// router.get("/handle-update", handleUpdate);

export default router;
