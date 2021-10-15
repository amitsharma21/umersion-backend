import express from "express";

import {
  fetchPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
} from "../controllers/privacypolicy.js";

const router = express.Router();

router.get("/fetch", fetchPrivacyPolicy);
router.post("/create", createPrivacyPolicy);
router.patch("/update", updatePrivacyPolicy);

export default router;
