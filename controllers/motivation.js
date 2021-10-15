import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import Motivation from "../models/motivation.js";

dotenv.config();

//----------------------------create motivation--------------------------------------------
export const createMotivation = async (req, res) => {
  try {
    const file = req.files.motivationImage;
    const { quote } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name);

    //checking file size
    if (file.truncated) throw new Error("File size is too big");

    //checking file type
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    )
      throw new Error("File type not supported");
    // saving file to the folder
    const savePath = path.join(
      __dirname,
      "../public/images/motivations",
      fileName
    );
    await file.mv(savePath);

    //saving data to the database
    const result = await Motivation.create({
      quote,
      image: fileName,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetch single motivation
export const fetchSingleMotivation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Motivation.findById(id);

    const fileName = result.image;
    result.image = path.join(
      process.env.BASIC_ROUTE,
      "../images/motivations",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//fetch all motivations
export const fetchAllMotivations = async (req, res) => {
  try {
    const result = await Motivation.find();
    result.map((single) => {
      const fileName = single.image;
      single.image = path.join(
        process.env.BASIC_ROUTE,
        "../images/motivations",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//---------------update the motivation take the id of motivation as parameter----------
export const updateMotivation = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.files.motivationImage;
    const { quote } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name);

    //checking file size
    if (file.truncated) throw new Error("File size is too big");

    //checking file type
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    )
      throw new Error("File type not supported");
    // saving file to the folder
    const savePath = path.join(
      __dirname,
      "../public/images/motivations",
      fileName
    );
    await file.mv(savePath);
    //updating data in db
    const updatedMotivation = await Motivation.findByIdAndUpdate(id, {
      quote,
      image: fileName,
    });
    const deletePath = path.join(
      __dirname,
      "../public/images/motivations",
      updatedMotivation.image
    );
    fs.unlinkSync(deletePath);

    res.status(200).json(updatedMotivation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//-----------------------------------------------delete the motivation----------------
export const deleteMotivation = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Motivation.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileName = result.image;
    const pathToFile = path.join(
      __dirname,
      "../public/images/motivations",
      fileName
    );

    fs.unlinkSync(pathToFile);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
