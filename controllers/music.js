import Music from "../models/music.js";
import path from "path";
import { fileURLToPath } from "url";

//creating the music
export const createMusic = async (req, res) => {
  try {
    const file = req.files.musicFile;
    const { title, description, tags, plan } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name);

    //checking file size
    if (file.truncated) throw new Error("File size is too big");

    //checking file type
    //   if (
    //     file.mimetype !== "image/png" &&
    //     file.mimetype !== "image/jpg" &&
    //     file.mimetype !== "image/jpeg"
    //   )
    //     throw new Error("File type not supported");
    // saving file to the folder
    console.log(file);
    const savePath = path.join(__dirname, "../public/music", fileName);
    await file.mv(savePath);

    //saving data to the database
    const result = await Music.create({
      title,
      description,
      tags: ["a", "b"],
      music: fileName,
      plan,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
