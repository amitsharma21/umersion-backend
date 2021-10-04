import mongoose from "mongoose";

const termsAndConditions = mongoose.Schema({
  tac: { type: String, required: true },
});

export default mongoose.model("TermsAndCondition", termsAndConditions);
