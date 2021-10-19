import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  video: { type: String, required: true },
  plan: { type: String, requires: true, default: "free" },
});

export default mongoose.model("Video", videoSchema);
