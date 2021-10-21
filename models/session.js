import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  thumbnail: { type: String, required: false },
  audioTracks: { type: [String], default: [] },
  videoTracks: { type: [String], default: [] },
  plan: { type: String, default: "free" },
});

export default mongoose.model("Session", sessionSchema);
