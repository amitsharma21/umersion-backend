import Note from "../models/note.js";

//creating the note it takes "title " and "description" as a req body
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Note.create({
      title,
      description,
      author: req.userId,
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching all the notes
export const fetchAllNotes = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const result = await Note.find({ author: req.userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching single note it takes id of note as params
export const fetchSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Note.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//deleting the note it takes the id of note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const result = await Note.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
