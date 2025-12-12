import {
  createVoyager,
  getVoyager,
  getVoyagerCoordinates,
  getVoyagers,
  exportVoyagers,
} from "@/controllers/VoyagerController";
import { apiAuth } from "@/middleware/apiAuth";
import { Router } from "express";

const voyagerRouter = Router();

voyagerRouter.use(apiAuth);

voyagerRouter.get("/voyagers", getVoyagers);
voyagerRouter.get("/coordinates", getVoyagerCoordinates);
voyagerRouter.get("/voyager/:id", getVoyager);
voyagerRouter.get("/export", exportVoyagers);
voyagerRouter.post("/new-voyager", createVoyager);

export default voyagerRouter;
