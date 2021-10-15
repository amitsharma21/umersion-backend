import mongoose from "mongoose";

const motivationSchema = mongoose.Schema({
  quote: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Motivation", motivationSchema);
