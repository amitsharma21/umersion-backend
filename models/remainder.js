import mongoose from "mongoose";

const remainder = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.model("Remainder", remainder);
