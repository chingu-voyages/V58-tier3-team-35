import express from "express";
import cors from "cors";
const app = express();
import voyagerRouter from "@/routes/voyager";
import chatRouter from "@/routes/chat";
import authRouter from "@/routes/auth";
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", voyagerRouter);
app.use("/api", chatRouter);

export default app;
