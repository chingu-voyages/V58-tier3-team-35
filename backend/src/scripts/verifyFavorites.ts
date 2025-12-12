import "dotenv/config";
import mongoose from "mongoose";
import UserAccount from "../models/UserAccount";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ACCESS_SECRET } from "../utils/constants";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/api/favorite-filter`;

async function verify() {
  try {
    await mongoose.connect(process.env.CONNECTION_URI as string);
    console.log("Connected to DB");

    // Create test user
    const email = `test-${Date.now()}@example.com`;
    const password = "password123";
    const user = await UserAccount.create({
      email,
      password,
      isVerified: true,
    });
    console.log("Created test user:", user.email);

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, isActive: true, pendingMail: false },
      ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    // 1. Create Filter
    console.log("Testing Create Filter...");
    const createRes = await axios.post(
      BASE_URL,
      { name: "Test Filter", filters: "https://example.com" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Create Status:", createRes.status);

    // 2. Test Duplicate Name
    console.log("Testing Duplicate Filter Name...");
    try {
      await axios.post(
        BASE_URL,
        { name: "Test Filter", filters: "https://example.com/other" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.error("Duplicate check failed: Should have returned 400");
    } catch (error: any) {
      if (error.response?.status === 400) {
        console.log("Duplicate check passed: 400 Bad Request");
      } else {
        console.error("Duplicate check failed:", error.response?.status);
      }
    }

    // Cleanup
    await UserAccount.findByIdAndDelete(user._id);
    console.log("Cleaned up test user");

    process.exit(0);
  } catch (error: any) {
    console.error(
      "Verification failed:",
      error.response?.data || error.message
    );
    process.exit(1);
  }
}

verify();
