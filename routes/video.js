import express from "express";
import fileUpload from "express-fileupload";

import { createVideo, streamVideo } from "../controllers/video.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 100 * 1024 * 1024 },
  })
);

router.post("/create", createVideo);
router.get("/stream/:id", streamVideo); //for streaming

export default router;
