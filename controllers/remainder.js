import Remainder from "../models/remainder.js";

//creating the remainder it takes "title" and "time" as a req body
export const createRemainder = async (req, res) => {
  try {
    const { title, time } = req.body;
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Remainder.create({ title, time, author: req.userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching all the remainders
export const fetchAllRemainder = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Remainder.find({ author: req.userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching single remainder it takes id of faq as params
export const fetchSingleRemainder = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const result = await Remainder.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//deleting the remainder it takes the id of faq
export const deleteRemainder = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const result = await Remainder.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
