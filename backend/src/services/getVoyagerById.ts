import Voyager from "@/models/Voyager";
import mongoose from "mongoose";

export default async function getVoyagerById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Voyager ID");
  }
  const voyager = await Voyager.findById(id);
  return voyager;
}
