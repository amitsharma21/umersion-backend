import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

import Music from "../models/music.js";
import User from "../models/user.js";

dotenv.config();

//-------------------------------------------creating the music---------------------------------------
export const createMusic = async (req, res) => {
  try {
    const file = req.files.musicFile;
    const thumbnail = req.files.thumbnail;
    const { title, description, tags, plan } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name); //for music
    const thumbnailName =
      new Date().getTime().toString() + path.extname(thumbnail.name); //for thumbnail

    //checking file size
    if (file.truncated) throw new Error("song size is too big");
    if (thumbnail.truncated) throw new Error("thumbnail size is too big");

    //checking file type
    if (file.mimetype !== "audio/mp3" && file.mimetype !== "audio/mpeg")
      throw new Error("File type not supported");
    if (
      thumbnail.mimetype !== "image/png" &&
      thumbnail.mimetype !== "image/jpg" &&
      thumbnail.mimetype !== "image/jpeg"
    )
      throw new Error("thumbnail type not supported");

    // saving file to the folder
    const savePath = path.join(__dirname, "../public/music", fileName);
    await file.mv(savePath);

    const thumbnailPath = path.join(
      __dirname,
      "../public/images/music",
      thumbnailName
    );
    await thumbnail.mv(thumbnailPath);

    //saving data to the database
    const result = await Music.create({
      title,
      description,
      tags: ["a", "b"],
      music: fileName,
      thumbnail: thumbnailName,
      plan,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------stream music---------------------------------------------------
export const streamMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Music.findById(id);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const range = req.headers.range;
    const musicPath = path.join(__dirname, "../public/music", result.music);
    const musicSize = fs.statSync(musicPath).size;

    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, musicSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${musicSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mp3",
    };
    res.writeHead(206, headers);

    const stream = fs.createReadStream(musicPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//--------------------------------------get all the music list--------------------------------------------
export const fetchAllMusic = async (req, res) => {
  try {
    const result = await Music.find();
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/blogs",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//---------------------------------------get single music data--------------------------------------------
export const fetchSingleMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Music.findById(id);
    const fileName = result.thumbnail;
    result.thumbnail = path.join(
      process.env.BASIC_ROUTE,
      "images/music",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//----------------------------add to favourite----------------------------------
export const addToFavourite = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.body; //here we are getting the music id that we want to add to favourite inside body
    const result = await User.findById(req.userId);
    result.musicFavourite.push(id); //pushing music to favourite
    const updatedResult = await User.findByIdAndUpdate(req.userId, result, {
      new: true,
    });
    res.status(500).json(updatedResult);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------fetch favourite songs------------------------
export const fetchFavourites = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const user = await User.findById(req.userId);
    const result = await Music.find({ _id: { $in: user.musicFavourite } });
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/music",
        fileName
      );
      return single;
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//-----------------------remove from favouorite music------------------------
export const removeFromFavourite = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.body; //here we are getting the music id that we want to remove from favourite inside body
    const user = await User.findById(req.userId);

    const array = user.musicFavourite.filter((single) => single !== id);

    const result = await User.findByIdAndUpdate(
      req.userId,
      { musicFavourite: array },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
