import express from "express";
import fileUpload from "express-fileupload";

import {
  createMusic,
  streamMusic,
  fetchSingleMusic,
  fetchAllMusic,
  addToFavourite,
  fetchFavourites,
  removeFromFavourite,
} from "../controllers/music.js";
import userAuth from "../middleware/userAuth.js";

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
router.patch("/addtofavourite", userAuth, addToFavourite);
router.get("/fetchfavourite", userAuth, fetchFavourites);
router.patch("/removefromfavourite", userAuth, removeFromFavourite);

export default router;
