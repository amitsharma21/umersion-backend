import express from "express";

import {
  fetchTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
} from "../controllers/termsandcondition.js";

const router = express.Router();

router.get("/fetch", fetchTermsAndConditions);
router.post("/create", createTermsAndConditions);
router.patch("/update", updateTermsAndConditions);

export default router;
