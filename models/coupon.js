import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Coupon", couponSchema);
