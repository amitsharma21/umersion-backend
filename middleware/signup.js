import User from "../models/user.js";

const signupMiddleware = async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  try {
    const existingUserWithEmail = await User.findOne({ email });
    const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });

    //if user is present we are not moving forward and send the error to the frontend
    if (existingUserWithEmail || existingUserWithPhoneNumber)
      return res.status(400).json({
        message: "User already exists with given email or phone number",
      });

    next();
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

export default signupMiddleware;
