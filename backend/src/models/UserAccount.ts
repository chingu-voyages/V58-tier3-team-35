import { HydratedDocument, model, Schema } from "mongoose";

export interface UserAccount {
  email: string;
  password: string;
  isVerified?: boolean;
  refreshToken?: string;
  pendingMail?: boolean;
}

export type UserAccountDocument = HydratedDocument<UserAccount>;

const userAccountSchema = new Schema<UserAccount>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
    pendingMail: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("UserAccount", userAccountSchema);
