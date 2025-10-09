import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to requester
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    quantity: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    location: { type: String, required: true },
    urgency: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },
    message: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
export default BloodRequest;
