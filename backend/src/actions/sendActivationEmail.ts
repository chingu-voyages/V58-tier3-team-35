import { generateEmailToken } from "@/auth/emailToken";
import sendEmail from "@/config/mailer";
import mailer from "@/config/mailer";
import { UserAccount } from "@/models/UserAccount";
import fs from "fs";
import path from "path";

export default async function sendActivationEmail(user: UserAccount) {
  if (!user) throw new Error("Please specify a valid user");

  const token = generateEmailToken({ email: user.email });
  const verifyLink = `${process.env.SPA_URL}/verify-email?token=${token}`;

  const templatePath = path.join(__dirname, "../templates/activationMail.html");

  const template = fs
    .readFileSync(templatePath, "utf8")
    .replace("{{verifyLink}}", verifyLink)
    .replace("{{logoUrl}}", process.env.APP_LOGO || "")
    .replace("{{year}}", new Date().getFullYear().toString());

  const mailObject = {
    to: user.email,
    subject: "Account Activation",
    html: template,
  };

  sendEmail(mailObject);
}
