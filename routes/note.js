//need authentication
import express from "express";
import userAuth from "../middleware/userAuth.js";

import {
  createNote,
  fetchAllNotes,
  fetchSingleNote,
  deleteNote,
} from "../controllers/note.js";

const router = express.Router();

router.post("/create", userAuth, createNote);
router.get("/fetchall", userAuth, fetchAllNotes);
router.get("/fetchsingle/:id", userAuth, fetchSingleNote);
router.delete("/delete/:id", userAuth, deleteNote);

export default router;
