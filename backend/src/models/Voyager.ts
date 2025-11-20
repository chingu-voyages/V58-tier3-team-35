import {
  Schema,
  model,
  Document,
  PaginateModel,
  HydratedDocument,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IVoyager {
  timestamp: string;
  gender: string;
  countryCode: string;
  timezone: string;
  goal: string;
  goalOther: string;
  source: string;
  sourceOther: string;
  countryName: string;
  soloProjectTier: string;
  roleType: string;
  voyageRole: string;
  voyageSignups: string;
  voyageTier: string;
  lat?: string | null;
  lng?: string | null;
}

export type VoyagerDocument = HydratedDocument<IVoyager>;

export interface VoyagerModel extends PaginateModel<VoyagerDocument> {}

const VoyagerSchema = new Schema<IVoyager>(
  {
    timestamp: { type: String, required: true },
    gender: { type: String, required: true },
    countryCode: { type: String, required: true },
    timezone: { type: String, required: true },
    goal: { type: String, required: true },
    goalOther: { type: String, required: true },
    source: { type: String, required: true },
    sourceOther: { type: String, required: true },
    countryName: { type: String, required: true },
    soloProjectTier: { type: String, required: true },
    roleType: { type: String, required: true },
    voyageRole: { type: String, required: true },
    voyageSignups: { type: String, required: true },
    voyageTier: { type: String, required: true },
    lat: { type: String, default: null },
    lng: { type: String, default: null },
  },
  { timestamps: true }
);

VoyagerSchema.plugin(mongoosePaginate);

export default model("Voyager", VoyagerSchema) as unknown as VoyagerModel;
