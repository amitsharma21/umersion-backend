import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";

import User from "../models/user.js";
import router from "../routes/user.js";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

//---------------------------------------sign in using simple form for user-----------------------------
export const signin = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    let existingUser = null;
    //user is trying to login with email
    if (email !== undefined) {
      existingUser = await User.findOne({ email });
    }
    //user is trying to login with Phone Number
    else if (phoneNumber !== undefined) {
      existingUser = await User.findOne({ phoneNumber });
    }
    if (!existingUser)
      return res.status(400).json({ message: "Invalid Credentials" });
    if (existingUser.signUpMethod !== "form")
      return res.status(404).json({
        message: `the account you are trying to access has been logged in through social media platforms`,
      });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });
    //creating jwt token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//---------------------------------------------signin using google for user-------------------------------------
export const googleSignIn = async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    //If user with given email id already present
    if (existingUser) {
      //login method is not from googe we return error message
      if (existingUser.signUpMethod !== "google") {
        return res.status(200).json({
          message: `User with given email address has already logged In from ${existingUser.signUpMethod} method`,
        });
      }
      //user is already present and its login method is google
      else {
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ result: existingUser, token });
      }
    }
    //if user is completly new
    const result = await User.create({
      name,
      email,
      signUpMethod: "google",
    });
    //generating the token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "something went wrong" });
  }
};

//------------------------------------------sign up for user using form-------------------------------
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
      signUpMethod: "form",
    });

    //generating the token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      /* at 2nd argument position we need to enter the secret string */
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    //sending back the details of the created user
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//----------------------------------fetching All the users inside database----------------------------
export const fetchAll = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//--------------------fetching single user it require user id as an input-----------------------------
export const fetchSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//------------------------forget password generating otp--------------------------------------------------
export const generateOtp = async (req, res) => {
  const { phoneNumber, channel } = req.body;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: phoneNumber, channel: channel })
    .then((verification) => {
      res.status(200).json(verification);
    })
    .catch((error) => {
      res.status(404).json({ message: "unsuccessfull" });
    });
};

//----------------------------forget password verify otp----------------------------------------------
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

//----------------------------change Name---------------------------------
export const changeName = async (req, res) => {
  const { id } = req.params;
  try {
    const { name } = req.body;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { name: name },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------change email--------------------------
export const changeEmail = async (req, res) => {
  const { id } = req.params;
  try {
    const { email } = req.body;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { email: email },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-----------------------change password -------------------------
export const changePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12 /*salt number*/);
    const result = await User.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
