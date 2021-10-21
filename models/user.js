import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  profilePicture: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  signUpMethod: { type: String, required: true },
  musicFavourite: { type: [String], default: [] },
});

export default mongoose.model("User", userSchema);
