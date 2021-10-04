import mongoose from "mongoose";

const contactusSchema = mongoose.Schema({
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
});

export default mongoose.model("Contactus", contactusSchema);
