import UserAccount from "@/models/UserAccount";

export async function getUserProfile(email: string) {
  const user = await UserAccount.findOne({ email });

  if (!user) throw new Error("Account not found!");
  return user;
}
