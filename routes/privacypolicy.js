import express from "express";

import {
  fetchPrivacyPolicy,
  createPrivacyPolicy,
} from "../controllers/privacypolicy.js";

const router = express.Router();

router.get("/fetch", fetchPrivacyPolicy);
router.post("/create", createPrivacyPolicy);

export default router;
