import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  profilePicture: { type: String, required: false },
  isActive: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
