import express from "express";

import {
  signup,
  signin,
  fetchAll,
  fetchSingle,
  generateOtp,
  verifyOtp,
} from "../controllers/user.js";

const router = express.Router();

//auth
router.post("/signup", signup);
router.post("/signin", signin);

//fetching user
router.get("/fetchall", fetchAll);
router.get("/fetchsingle/:id", fetchSingle);

//forget password
router.post("/generateotp", generateOtp);
router.post("/verifyotp", verifyOtp);

export default router;
