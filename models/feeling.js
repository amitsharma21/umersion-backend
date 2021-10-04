import mongoose from "mongoose";

const feeling = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
});

const PostMessage = mongoose.model("Feeling", feeling);
export default PostMessage;
