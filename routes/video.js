import express from "express";
import fileUpload from "express-fileupload";

import {
  createVideo,
  fetchSingleVideo,
  streamVideo,
  fetchAllVideos,
  deleteVideo,
} from "../controllers/video.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 300 * 1024 * 1024 },
  })
);

router.post("/create", createVideo);
router.get("/stream/:id", streamVideo); //for streaming
router.get("/fetchsingle/:id", fetchSingleVideo);
router.get("/fetchall", fetchAllVideos);
router.delete("/delete/:id", deleteVideo);

export default router;
