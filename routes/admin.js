import express from "express";

import {
  signin,
  signup,
  toggleUserStatus,
  sendEmail,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.post("/toggleuserstatus", toggleUserStatus, sendEmail);
router.post("/reactivateuser", toggleUserStatus, sendEmail);

export default router;
