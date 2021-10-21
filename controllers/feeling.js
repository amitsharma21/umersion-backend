import Feeling from "../models/feeling.js";

//this function creates the feeling
export const createFeeling = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });

    const { date, mood, tags, feeling } = req.body;
    const result = await Feeling.create({
      author: req.userId,
      date,
      mood,
      tags,
      feeling,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//this function fetch all the feelings
export const fetchAllFeelings = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Feeling.find({ author: req.userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//this function fetch single feeling take the id of feeling as params
export const fetchSingleFeelingById = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const result = await Feeling.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// //this function fetch feelings take the date as a param
// export const fetchFeelingByDate = async (req, res) => {
//   console.log("result");
//   try {
//     if (!req.userId)
//       return res.status(404).json({ message: "user is not authenticated" });
//     const { date } = req.params;
//     const result = await Feeling.find({ date: date });
//     res.status(200).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

//this function update the feeling and take the id of feeling as params
export const updateFeeling = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const updatedFeeling = req.body;
    const result = await Feeling.findByIdAndUpdate(id, updatedFeeling, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//this function delete the given feeling take the id as params
export const deleteFeeling = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.params;
    const result = await Feeling.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
