import express from "express";

import {
  fetchTermsAndConditions,
  createTermsAndConditions,
} from "../controllers/termsandcondition.js";

const router = express.Router();

router.get("/fetch", fetchTermsAndConditions);
router.post("/create", createTermsAndConditions);

export default router;
