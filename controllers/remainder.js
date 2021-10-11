import Remainder from "../models/remainder.js";

//creating the remainder it takes "title" and "time" as a req body
export const createRemainder = async (req, res) => {
  try {
    const { time, repeat, label, ringDuration, snoozeDuration } = req.body;
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Remainder.create({
      time,
      repeat,
      label,
      ringDuration,
      snoozeDuration,
      author: req.userId,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
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

//update the remainder it takes the id of faq as argument
export const updateRemainder = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const remainder = req.body;
    const updatedRemainder = await Remainder.findByIdAndUpdate(id, remainder, {
      new: true,
    });
    res.status(200).json(updatedRemainder);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//switch the remainder from on to off or from off to on
export const toggleRemainder = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const remainder = await Remainder.findById(id);
    console.log(remainder);
    const status = remainder.status;
    const updatedRemainder = await Remainder.findOneAndUpdate(
      { _id: id },
      { status: !status },
      { new: true }
    );
    res.status(200).json(updatedRemainder);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
