import {
  createFavoriteFilter,
  deleteFavoriteFilter,
  getFavoriteFilters,
} from "@/controllers/favoriteFilter";
import userAuth from "@/middleware/userAuth";
import { Router } from "express";

const router = Router();

router.use(userAuth);

router.post("/", createFavoriteFilter);
router.get("/", getFavoriteFilters);
router.delete("/:id", deleteFavoriteFilter);

export default router;
