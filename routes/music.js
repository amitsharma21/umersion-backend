import express from "express";
import fileUpload from "express-fileupload";

import { createMusic, streamMusic } from "../controllers/music.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

router.post("/create", createMusic);
router.get("/stream/:id", streamMusic);

export default router;
