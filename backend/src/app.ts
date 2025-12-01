// import '../src/services/genkit';
import express from "express";
import cors from "cors";
const app = express();
import routes from "@/routes/router";
app.use(cors());
app.use(express.json());
app.use("/api", routes);

export default app;
 