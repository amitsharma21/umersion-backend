import mongoose from "mongoose";

const faq = mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export default mongoose.model("Faq", faq);
