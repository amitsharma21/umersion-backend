import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";

//sigining in admin
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin)
      return res.status(400).json({ message: "Invalid Email Address" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingAdmin, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//sign up the admin
export const signup = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    //checking whether user already present or not
    const existingAdmin = await Admin.findOne({ email });

    //if user is present we are not moving forward and send the error to the frontend
    if (existingAdmin)
      res.status(400).json({ message: "Admin already exists" });

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 12 /*salt number*/);

    //entering the details of the user into the database
    const result = await Admin.create({
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
