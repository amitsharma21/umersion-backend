import express from "express";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";

import {
  createBlog,
  fetchSingleBlog,
  fetchAllBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.js";

const router = express.Router();

//setup for file upload
router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

router.post("/create", createBlog);
router.get("/fetchsingle/:id", fetchSingleBlog);
router.get("/fetchall", fetchAllBlogs);
router.patch("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;
