import Video from "../models/video.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

//creating the video
export const createVideo = async (req, res) => {
  try {
    const file = req.files.videoFile;
    const thumbnail = req.files.thumbnail;
    const { title, description, tags, plan, category } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name); //for video
    const thumbnailName =
      new Date().getTime().toString() + path.extname(thumbnail.name); //for thumbnail

    //checking file size
    if (file.truncated) throw new Error("File size is too big");
    if (thumbnail.truncated) throw new Error("thumbnail size is too big");

    //checking file type
    if (file.mimetype !== "video/mp4")
      throw new Error("File type not supported");
    if (
      thumbnail.mimetype !== "image/png" &&
      thumbnail.mimetype !== "image/jpg" &&
      thumbnail.mimetype !== "image/jpeg"
    )
      throw new Error("thumbnail type not supported");

    // saving file to the folder
    const savePath = path.join(__dirname, "../public/video", fileName);
    await file.mv(savePath);

    const thumbnailPath = path.join(
      __dirname,
      "../public/images/video",
      thumbnailName
    );
    await thumbnail.mv(thumbnailPath);

    //saving data to the database
    const result = await Video.create({
      title,
      description,
      tags: ["a", "b"],
      video: fileName,
      thumbnail: thumbnailName,
      category,
      plan,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching single video and stream that
export const streamVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Video.findById(id);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const range = req.headers.range;
    const videoPath = path.join(__dirname, "../public/video", result.video);
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//--------------------------------------get all the video list--------------------------------------------
export const fetchAllVideos = async (req, res) => {
  try {
    const result = await Video.find();
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/video",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//---------------------------------------get single video data--------------------------------------------
export const fetchSingleVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Video.findById(id);
    const fileName = result.thumbnail;
    result.thumbnail = path.join(
      process.env.BASIC_ROUTE,
      "images/video",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//------------------------------------delete the video----------------------------------
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Video.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //deleting the video file from folder
    const video = result.video;
    const pathToVideo = path.join(__dirname, "../public/video", video);

    fs.unlinkSync(pathToVideo);

    //deleting the thumbnail from the folder
    const thumbnail = result.thumbnail;
    const pathToThumbnail = path.join(
      __dirname,
      "../public/images/video",
      thumbnail
    );

    fs.unlinkSync(pathToThumbnail);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
