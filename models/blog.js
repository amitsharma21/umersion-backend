import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Blog", blogSchema);
