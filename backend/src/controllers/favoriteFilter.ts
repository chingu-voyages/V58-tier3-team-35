import FavoriteFilter from "@/models/FavoriteFilter";
import UserAccount from "@/models/UserAccount";
import { Request, Response } from "express";
import validator from "validator";

export const createFavoriteFilter = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Please provide name and filters" });
    }
    const { name, filters } = req.body;
    if (!name || !filters) {
      return res.status(400).json({ message: "Name and Filters are required" });
    }

    if (!validator.isURL(filters)) {
      return res.status(400).json({ message: "Invalid Filters" });
    }
    const user = await UserAccount.findOne({
      email: req.user?.email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingFilter = await FavoriteFilter.findOne({
      user: user._id,
      name,
    });

    if (existingFilter) {
      return res
        .status(400)
        .json({ message: "Filter with this name already exists" });
    }

    const favoriteFilter = await FavoriteFilter.create({
      user: user._id,
      name,
      url: filters,
    });

    return res.status(201).json(favoriteFilter);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFavoriteFilters = async (req: Request, res: Response) => {
  try {
    const user = await UserAccount.findOne({
      email: req.user?.email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favoriteFilters = await FavoriteFilter.find({
      user: user._id,
    });

    return res.status(200).json(favoriteFilters);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFavoriteFilter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserAccount.findOne({
      email: req.user?.email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favoriteFilter = await FavoriteFilter.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!favoriteFilter) {
      return res.status(404).json({ message: "Filter not found" });
    }

    return res.status(200).json({ message: "Filter deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
