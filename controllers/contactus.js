import Contactus from "../models/contactus.js";

export const createContactus = async (req, res) => {
  try {
    const { email, phoneNumber, address } = req.body;
    const result = await Contactus.create({ email, phoneNumber, address });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

export const fetchContactus = async (req, res) => {
  try {
    const result = await Contactus.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
