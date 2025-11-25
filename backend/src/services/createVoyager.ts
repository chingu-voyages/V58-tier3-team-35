import Voyager from "@/models/Voyager";
import { getCoordinatesByCountry } from "@/scripts/UpdateCoordinates";
import { validateVoyagerInput } from "@/utils/validator";
import { Request } from "express";

export default async function createVoyagerService(req: Request) {
  const validation = validateVoyagerInput(req.body);
  if (validation.length > 0) {
    return validation;
  }

  const countryDetails = await getCoordinatesByCountry(req.body.countryName);
  if (!countryDetails) {
    throw new Error("Country could not be validated, please try again");
  }

  const newVoyager = new Voyager({
    ...req.body,
    ...countryDetails,
    timezone: "",
    timestamp: new Date().toISOString(),
    voyageSignups: "",
  });
  newVoyager.save();
  return newVoyager;
}
