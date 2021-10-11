import express from "express";

import {
  createFeeling,
  fetchAllFeelings,
  fetchSingleFeelingById,
  fetchFeelingByDate,
  updateFeeling,
  deleteFeeling,
} from "../controllers/feeling.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/create", userAuth, createFeeling);
router.get("/fetchall", userAuth, fetchAllFeelings);
router.get("/fetchsingle/:id", userAuth, fetchSingleFeelingById);
router.get("/fetchall/:date", userAuth, fetchFeelingByDate);
router.patch("/update/:id", userAuth, updateFeeling);
router.delete("/delete/:id", userAuth, deleteFeeling);

export default router;
