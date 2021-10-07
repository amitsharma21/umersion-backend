import express from "express";

import {
  signup,
  signin,
  googleSignIn,
  fetchAll,
  fetchSingle,
  generateOtp,
  verifyOtp,
} from "../controllers/user.js";
import signupMiddleware from "../middleware/signup.js";

const router = express.Router();

//auth
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googlesignin", googleSignIn);

//fetching user
router.get("/fetchall", fetchAll);
router.get("/fetchsingle/:id", fetchSingle);

//forget password
router.post("/generatesignupotp", signupMiddleware, generateOtp);
router.post("/verifyotp", verifyOtp);

export default router;
