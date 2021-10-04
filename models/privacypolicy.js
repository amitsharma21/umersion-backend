import mongoose from "mongoose";

const privacyPolicy = mongoose.Schema({
  privacyPolicy: { type: String, required: true },
});

export default mongoose.model("PrivacyPolicy", privacyPolicy);
