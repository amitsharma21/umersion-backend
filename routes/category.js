import express from "express";

import {
  createCategory,
  fetchAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/fetchall", fetchAllCategories);
router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
