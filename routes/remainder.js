//need authentication
import express from "express";

import userAuth from "../middleware/userAuth.js";

import {
  createRemainder,
  fetchSingleRemainder,
  fetchAllRemainder,
  deleteRemainder,
  updateRemainder,
  toggleRemainder,
} from "../controllers/remainder.js";

const router = express.Router();

router.post("/create", userAuth, createRemainder);
router.get("/fetchsingle/:id", userAuth, fetchSingleRemainder);
router.get("/fetchall", userAuth, fetchAllRemainder);
router.delete("/delete/:id", userAuth, deleteRemainder);
router.patch("/update/:id", userAuth, updateRemainder);
router.patch("/toggle/:id", userAuth, toggleRemainder);

export default router;
