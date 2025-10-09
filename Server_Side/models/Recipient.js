import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodGroupNeeded: { type: String, required: true },
    hospital: { type: String },
    urgencyLevel: { type: String, enum: ["low", "medium", "high"], default: "medium" }
  },
  { timestamps: true }
);

const Recipient = mongoose.model("Recipient", recipientSchema);
export default Recipient;
