import Faq from "../models/faq.js";

//creating the faq it takes "question " and "answer" as a req body
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const result = await Faq.create({ question, answer });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching all the frequently asked questions
export const fetchAllFaq = async (req, res) => {
  try {
    const result = await Faq.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching single faq it takes id of faq as params
export const fetchSingleFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Faq.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//deleting the faq it takes the id of faq
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Faq.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
