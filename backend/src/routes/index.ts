import app from "@/config/app";
import voyagerRouter from "@/routes/voyager";
import chatRouter from "@/routes/chat";
import authRouter from "@/routes/auth";
import profileRouter from "@/routes/profile";
import dashboardRouter from "@/routes/dashboard";
import { rateLimiter } from "@/middleware/limiter";

app.use(rateLimiter);

app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", voyagerRouter);
app.use("/api", chatRouter);

export default app;
