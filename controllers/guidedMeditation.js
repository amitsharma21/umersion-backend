import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import GuidedMeditation from "../models/guidedMeditation.js";
import User from "../models/user.js";

dotenv.config();

//----------------------create Guided Meditation---------------------------------------
export const createGuidedMeditation = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const thumbnail = req.files.thumbnail;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const thumbnailName =
      new Date().getTime().toString() + path.extname(thumbnail.name);

    //checking thumbnail size
    if (thumbnail.truncated) throw new Error("Thumbnail size is too big");

    //checking thumbnail type
    if (
      thumbnail.mimetype !== "image/png" &&
      thumbnail.mimetype !== "image/jpg" &&
      thumbnail.mimetype !== "image/jpeg"
    )
      throw new Error("thumbnail type not supported");

    // saving thumbnail to the folder
    const savePath = path.join(
      __dirname,
      "../public/images/guidedMeditations",
      thumbnailName
    );
    await thumbnail.mv(savePath);

    //saving data to the database
    const result = await GuidedMeditation.create({
      title,
      description,
      tags: ["a"],
      thumbnail: thumbnailName,
      category,
    });
    res.status(200).json(result);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------delete GuidedMeditation take the id as param---------------------------
export const deleteGuidedMeditation = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await GuidedMeditation.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileName = result.thumbnail;
    const pathToFile = path.join(
      __dirname,
      "../public/images/guidedMeditations",
      fileName
    );

    fs.unlinkSync(pathToFile);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//------------------fetch all Guided Meditation------------------------------------
export const fetchAllGuidedMeditation = async (req, res) => {
  try {
    const result = await GuidedMeditation.find();
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/guidedMeditations",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//----------------------fetch single Guided Meditation take id as param---------------------------------
export const fetchSingleGuidedMeditation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GuidedMeditation.findById(id);

    const fileName = result.thumbnail;
    result.thumbnail = path.join(
      process.env.BASIC_ROUTE,
      "images/guidedMeditations",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//-----------------------------add to favourite Guided Meditation-----------------------------------
export const addToFavouriteGuidedMeditation = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.body; //here we are getting the guided Meditation id that we want to add to favourite inside body
    const result = await User.findById(req.userId);
    result.guidedMeditationFavourite.push(id); //pushing music to favourite
    const updatedResult = await User.findByIdAndUpdate(req.userId, result, {
      new: true,
    });
    res.status(500).json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------fetch favourite Guided Meditation-------------------
export const fetchFavouriteGuidedMeditations = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const user = await User.findById(req.userId);
    const result = await GuidedMeditation.find({
      _id: { $in: user.guidedMeditationFavourite },
    });
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/guidedMeditations",
        fileName
      );
      return single;
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-----------------------remove from favouorite guidedMeditation------------------------
export const removeFromFavouriteGuidedMeditation = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.body; //here we are getting the guided Meditation id that we want to remove from favourite inside body
    const user = await User.findById(req.userId);

    const array = user.guidedMeditationFavourite.filter(
      (single) => single !== id
    );

    const result = await User.findByIdAndUpdate(
      req.userId,
      { guidedMeditationFavourite: array },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//remaining:- add new songto playlist, add new video to playlist, delete song or video from playlist
//reamaining:- update the given session
