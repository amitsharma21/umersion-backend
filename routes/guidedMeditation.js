import express from "express";
import fileUpload from "express-fileupload";

import {
  createGuidedMeditation,
  deleteGuidedMeditation,
  fetchAllGuidedMeditation,
  fetchSingleGuidedMeditation,
  addToFavouriteGuidedMeditation,
  fetchFavouriteGuidedMeditations,
  removeFromFavouriteGuidedMeditation,
} from "../controllers/guidedMeditation.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

router.post("/create", createGuidedMeditation);
router.delete("/delete/:id", deleteGuidedMeditation);
router.get("/fetchall", fetchAllGuidedMeditation);
router.get("/fetchsingle/:id", fetchSingleGuidedMeditation);
router.patch("/addtofavourite", userAuth, addToFavouriteGuidedMeditation);
router.get("/fetchfavourite", userAuth, fetchFavouriteGuidedMeditations);
router.patch(
  "/removefromfavourite",
  userAuth,
  removeFromFavouriteGuidedMeditation
);

export default router;
