import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import Session from "../models/session.js";

dotenv.config();

//----------------------create session---------------------------------------
export const createSession = async (req, res) => {
  try {
    const { title, description, tags, audioTracks, videoTracks, plan } =
      req.body;
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
      "../public/images/sessions",
      thumbnailName
    );
    await thumbnail.mv(savePath);

    //saving data to the database
    const result = await Session.create({
      title,
      description,
      tags,
      thumbnail: thumbnailName,
      audioTracks,
      videoTracks,
      plan,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------delete session take the id as param---------------------------
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Session.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileName = result.thumbnail;
    const pathToFile = path.join(
      __dirname,
      "../public/images/sessions",
      fileName
    );

    fs.unlinkSync(pathToFile);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//------------------fetch all sessions------------------------------------
export const fetchAllSessions = async (req, res) => {
  try {
    const result = await Session.find();
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/sessions",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//----------------------fetch single session take id as param---------------------------------
export const fetchSingleSession = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Session.findById(id);

    const fileName = result.thumbnail;
    result.thumbnail = path.join(
      process.env.BASIC_ROUTE,
      "images/sessions",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//remaining:- add new songto playlist, add new video to playlist, delete song or video from playlist
//reamaining:- update the given session
