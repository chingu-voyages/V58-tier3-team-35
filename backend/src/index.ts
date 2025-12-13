import dotenv from "dotenv";
dotenv.config();

import app from "@/routes";
import { connectDB } from "@/config/db";

const port = process.env.PORT || 5000;

async function start() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

start();
