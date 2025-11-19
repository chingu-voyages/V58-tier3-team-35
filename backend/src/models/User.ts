import { Schema, model } from "mongoose";

const VoyagerSchema = new Schema(
  {
    timestamp: String,
    gender: String,
    countryCode: String,
    timezone: String,
    goal: String,
    goalOther: String,
    source: String,
    sourceOther: String,
    countryName: String,
    soloProjectTier: String,
    roleType: String,
    voyageRole: String,
    voyageSignups: String,
    voyageTier: String,
    lat: { type: String, default: null },
    lng: { type: String, default: null },
  },
  { timestamps: true }
);

export default model("Voyagers", VoyagerSchema);
