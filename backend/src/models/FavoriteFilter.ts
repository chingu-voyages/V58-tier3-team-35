import { HydratedDocument, model, Schema, Types } from "mongoose";

export interface FavoriteFilter {
  user: Types.ObjectId;
  name: string;
  url: string;
}

export type FavoriteFilterDocument = HydratedDocument<FavoriteFilter>;

const favoriteFilterSchema = new Schema<FavoriteFilter>(
  {
    user: { type: Schema.Types.ObjectId, ref: "UserAccount", required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("FavoriteFilter", favoriteFilterSchema);
