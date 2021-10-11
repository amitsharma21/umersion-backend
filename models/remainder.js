import mongoose from "mongoose";

const remainder = mongoose.Schema({
  author: { type: String, required: true },
  time: { type: String, required: true },
  repeat: { type: [String], required: true },
  label: { type: String, required: true },
  ringDuration: { type: String, required: true },
  snoozeDuration: { type: String, required: true },
  status: { type: Boolean, default: true },
});

export default mongoose.model("Remainder", remainder);
