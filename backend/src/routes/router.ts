import { getVoyagers } from "@/controllers/VoyagerController";
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

router.get("/voyagers", getVoyagers);

// router.get("/import", importVoyagers);

export default router;
