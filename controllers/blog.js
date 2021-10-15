import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import Blog from "../models/blog.js";

dotenv.config();

//----------------------------create blog--------------------------------------------
export const createBlog = async (req, res) => {
  try {
    const file = req.files.blogImage;
    const { title, description, tags, date, author, image } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName =
      new Date().getTime().toString() + author + path.extname(file.name);

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
    console.log(file);
    const savePath = path.join(__dirname, "../public/images/blogs", fileName);
    await file.mv(savePath);

    //saving data to the database
    const result = await Blog.create({
      title,
      description,
      tags: ["a", "b"],
      date: new Date(),
      author,
      image: fileName,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetch single blog
export const fetchSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findById(id);

    const fileName = result.image;
    result.image = path.join(
      process.env.BASIC_ROUTE,
      "../images/blogs",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//fetch all blog
export const fetchAllBlogs = async (req, res) => {
  try {
    const result = await Blog.find();
    console.log(result);
    result.map((single) => {
      const fileName = single.image;
      single.image = path.join(
        process.env.BASIC_ROUTE,
        "../images/blogs/",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//---------------update the blog take the id of blog as parameter----------
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.files.blogImage;
    const { title, description, tags, date, author, image } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName =
      new Date().getTime().toString() + author + path.extname(file.name);

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
    const savePath = path.join(__dirname, "../public/images/blogs", fileName);
    await file.mv(savePath);
    //updating data in db
    const updatedBlog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
      tags: ["c", "d"],
      date: new Date(),
      author,
      image: fileName,
    });
    const deletePath = path.join(
      __dirname,
      "../public/images/blogs",
      updatedBlog.image
    );
    fs.unlinkSync(deletePath);

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//-----------------------------------------------delete the blog----------------
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Blog.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileName = result.image;
    const pathToFile = path.join(__dirname, "../public/images/blogs", fileName);

    fs.unlinkSync(pathToFile);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
