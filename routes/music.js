import express from "express";
import fileUpload from "express-fileupload";

import {
  createMusic,
  streamMusic,
  fetchSingleMusic,
  fetchAllMusic,
} from "../controllers/music.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

router.post("/create", createMusic);
router.get("/fetchsingle/:id", fetchSingleMusic);
router.get("/fetchall", fetchAllMusic);
router.get("/stream/:id", streamMusic);

export default router;
