import jwt from "jsonwebtoken";

export const EMAIL_TOKEN_SECRET: string = process.env.EMAIL_TOKEN_SECRET || "";
export const EMAIL_TOKEN_EXPIRES = "30m";

export const generateEmailToken = (payload: { email: string }) => {
  return jwt.sign(payload, EMAIL_TOKEN_SECRET, {
    expiresIn: EMAIL_TOKEN_EXPIRES,
  });
};
