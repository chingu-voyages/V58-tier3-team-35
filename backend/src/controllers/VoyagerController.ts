import { Request, Response } from "express";
import axios from "axios";
import getVoyagersWithFilters from "../services/getVoyagers";
import Voyager from "@/models/Voyager";
import getVoyagerCoordinatesWithFilters from "@/services/getVoyagerCoordinates";
import getVoyagerById from "@/services/getVoyagerById";
import createVoyagerService from "@/services/createVoyager";

export async function getVoyagers(req: Request, res: Response) {
  try {
    const result = await getVoyagersWithFilters(req.query);

    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}

export async function getVoyagerCoordinates(req: Request, res: Response) {
  try {
    const result = await getVoyagerCoordinatesWithFilters(req.query);

    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}

export async function getVoyager(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing voyager's ID" });
  }

  try {
    const result = await getVoyagerById(id);
    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}

export async function createVoyager(req: Request, res: Response) {
  try {
    const { captchaToken } = req.body;

    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha token is required" });
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
    const verificationResponse = await axios.post(verificationUrl);

    if (!verificationResponse.data.success) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    delete req.body.captchaToken;

    const result = await createVoyagerService(req);
    if (Array.isArray(result)) {
      return res.status(400).json({ errors: result });
    }
    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(400).json({
      message: error?.message || "Something went wrong",
    });
  }
}
