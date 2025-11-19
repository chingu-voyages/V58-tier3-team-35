import { apiAuth } from "@/middleware/apiAuth";
import { Router } from "express";

const router = Router();

router.use(apiAuth);

router.get("/", (req, res) => {
  console.log(req);
  res.json({
    app_version: "1.0.0",
  });
});

export default router;
