import PrivacyPolicy from "../models/privacypolicy.js";

//creating the privacy policy it takes privacyPolicy as an argument
export const createPrivacyPolicy = async (req, res) => {
  try {
    const { privacyPolicy } = req.body;
    const result = await PrivacyPolicy.create({ privacyPolicy });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching terms and conditions
export const fetchPrivacyPolicy = async (req, res) => {
  try {
    const result = await PrivacyPolicy.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
