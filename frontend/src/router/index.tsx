import { createBrowserRouter } from "react-router";
import routes from "./routes";
const isProduction = import.meta.env.MODE === "production";

const router = createBrowserRouter(routes, {
  basename: isProduction ? "/V58-tier3-team-35/" : "/",
});

export default router;
