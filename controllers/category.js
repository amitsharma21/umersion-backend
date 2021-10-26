import Category from "../models/category.js";

//creating the category it takes "title" as a req body
export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await Category.create({ title });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching all the Categories
export const fetchAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//updating the Category it takes the id of Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const result = await Category.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//deleting the Category it takes the id of Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
