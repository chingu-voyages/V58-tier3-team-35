import UserAccount from "@/models/UserAccount";
import { userAccountInput } from "@/types/userAccountTypes";
import { isEmail, isEmpty, isLength, isStrongPassword } from "validator";

export const validateInput = async (
  data: userAccountInput
): Promise<userAccountInput> => {
  if (isEmpty(data.email) || isEmpty(data.password)) {
    throw new Error("Please provide all fields");
  }

  if (!isEmail(data.email)) {
    throw new Error("Invalid email");
  }

  if (!isLength(data.password, { min: 6 })) {
    throw new Error("Password must have at least 6 characters");
  }

  if (!isStrongPassword(data.password)) {
    throw new Error(
      "Password must include numbers, uppercase and lowercase letters, and special characters"
    );
  }
  const user = await UserAccount.findOne({ email: data.email });
  if (user) {
    throw new Error("User already exists");
  }
  return data;
};
