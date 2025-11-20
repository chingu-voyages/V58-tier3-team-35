import Voyager from "@/models/Voyager";
import axios from "axios";
import { Request, Response } from "express";

async function getCoordinatesByCountry(countryName: string) {
  const apiKey = "AIzaSyAF0Htn8-cE8t0WAWXaYVSAt_HiqWsnibo";

  const url = "https://maps.googleapis.com/maps/api/geocode/json";

  const res = await axios.get(url, {
    params: {
      address: countryName,
      key: apiKey,
    },
  });

  if (res.data.status !== "OK") {
    console.log("Geocoding error:", res.data.status);
    return null;
  }
  const location = res.data.results[0]?.geometry?.location;

  return {
    lat: location.lat,
    lng: location.lng,
  };
}

async function getCountries() {
  const countries = await Voyager.distinct("countryName");
  return countries;
}

export async function handleUpdate(req: Request, res: Response) {
  try {
    const countries = await getCountries();
    const updates: Array<{ country: string; updated: number }> = [];
    for (const country of countries) {
      if (!country) continue;

      const coordinates = await getCoordinatesByCountry(country);
      if (!coordinates) continue;

      const result = await Voyager.updateMany(
        { countryName: country },
        {
          $set: {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
        }
      );

      updates.push({
        country,
        updated: result.modifiedCount,
      });
    }
    return res.json({
      success: true,
      message: "Coordinates updated for all countries",
      updates,
    });
  } catch (error: any) {
    console.log(error);
  }
}
