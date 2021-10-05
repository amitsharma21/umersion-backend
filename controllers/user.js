import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
// const client = twilio(
//   "ACb7556d15385f1c4a9153f3634b7c338a",
//   "79c77da2f9e40c71f9bc1793c60e6ecc"
// );
//sign in for user
export const signin = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    let existingUser = null;
    if (email !== undefined) {
      existingUser = await User.findOne({ email });
    } else if (phoneNumber !== undefined) {
      console.log("reached");
      existingUser = await User.findOne({ phoneNumber });
    }
    if (!existingUser)
      return res.status(400).json({ message: "Invalid Credentials" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//sign up for user
export const signup = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    //checking whether user already present or not
    const existingUserWithEmail = await User.findOne({ email });
    const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });

    //if user is present we are not moving forward and send the error to the frontend
    if (existingUserWithEmail || existingUserWithPhoneNumber)
      return res.status(400).json({
        message: "User already exists with given email or phone number",
      });

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 12 /*salt number*/);

    //entering the details of the user into the database
    const result = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    //generating the token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      /* at 2nd argument position we need to enter the secret string */ "test",
      { expiresIn: "1h" }
    );

    //sending back the details of the created user
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//fetching All the users inside database
export const fetchAll = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//fetching single user it require user id as an input
export const fetchSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//forget password generating otp
export const generateOtp = async (req, res) => {
  const { phoneNumber, channel } = req.body;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: phoneNumber, channel: channel })
    .then((verification) => {
      console.log(verification.status);
      res.status(200).json(verification);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "unsuccessfull" });
    });
};

//forget password verify otp
export const verifyOtp = async (req, res) => {
  const { phoneNumber, code } = req.body;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: phoneNumber, code: code })
    .then((verification_check) => {
      console.log(verification_check.status);
      res.status(200).json(verification_check);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "unsuccessfull" });
    });
};
