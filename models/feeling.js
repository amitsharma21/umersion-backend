import mongoose from "mongoose";

const feeling = mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  mood: { type: String, required: true },
  tags: { type: [String] },
  feeling: { type: String },
});

const PostMessage = mongoose.model("Feeling", feeling);
export default PostMessage;
