import mongoose from "mongoose";

const musicSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  music: { type: String, required: true },
  thumbnail: { type: String, required: false },
  plan: { type: String, requires: true, default: "free" },
});

export default mongoose.model("Music", musicSchema);
