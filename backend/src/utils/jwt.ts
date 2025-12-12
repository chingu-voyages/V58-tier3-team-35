import jwt from "jsonwebtoken";
import {
  ACCESS_SECRET,
  REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "./constants";

export const generateAccessToken = (payload: { email: string }) => {
  return jwt.sign(payload, ACCESS_SECRET || "", {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
};

export const generateRefreshToken = (payload: { email: string }) => {
  return jwt.sign(payload, REFRESH_SECRET || "", {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
};
