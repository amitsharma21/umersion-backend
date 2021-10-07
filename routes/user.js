import express from "express";

import {
  signup,
  signin,
  googleSignIn,
  fetchAll,
  fetchSingle,
  generateOtp,
  verifyOtp,
  changeName,
  changeEmail,
  changePassword,
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

//signup otp verification
router.post("/generatesignupotp", signupMiddleware, generateOtp);
//normal otp generation
router.post("/generateotp", generateOtp);
router.post("/verifyotp", verifyOtp);

//updating profile
router.patch("/changename/:id", changeName);
router.patch("/changeemail/:id", changeEmail);
router.patch("/changepassword/:id", changePassword);

export default router;
