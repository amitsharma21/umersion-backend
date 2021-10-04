import express from "express";

import {
  fetchAllFaq,
  fetchSingleFaq,
  createFaq,
  deleteFaq,
} from "../controllers/faq.js";

const router = express.Router();

router.get("/fetchall", fetchAllFaq);
router.get("/fetchsingle/:id", fetchSingleFaq);
router.post("/create", createFaq);
router.delete("/delete/:id", deleteFaq);

export default router;
