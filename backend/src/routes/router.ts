import {
  getVoyagerCoordinates,
  getVoyagers,
} from "@/controllers/VoyagerController";
import { apiAuth } from "@/middleware/apiAuth";
import { handleUpdate } from "@/scripts/UpdateCoordinates";
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
router.get("/coordinates", getVoyagerCoordinates);

// router.get("/handle-update", handleUpdate);

export default router;
