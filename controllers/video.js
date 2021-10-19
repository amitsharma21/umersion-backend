import Video from "../models/video.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

//creating the video
export const createVideo = async (req, res) => {
  try {
    const file = req.files.videoFile;
    const { title, description, tags, plan } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name);

    //checking file size
    if (file.truncated) throw new Error("File size is too big");

    //checking file type
    if (file.mimetype !== "video/mp4")
      throw new Error("File type not supported");
    // saving file to the folder
    const savePath = path.join(__dirname, "../public/video", fileName);
    await file.mv(savePath);

    //saving data to the database
    const result = await Video.create({
      title,
      description,
      tags: ["a", "b"],
      video: fileName,
      plan,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching the single video
export const streamVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Video.findById(id);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const range = req.headers.range;
    console.log(result);
    console.log("amma");
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
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
