import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true
    },
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18, max: 65 },
    bloodGroup: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    phone: { type: String, required: true, match: [/^\d{7,15}$/, "Invalid phone number"] },
    email: { type: String, required: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
    location: { type: String, required: true, trim: true },
    lastDonation: { type: Date, default: null },
    weight: { type: Number, min: 50 },
    diseases: { type: String, default: "None", trim: true },
    availability: { type: Boolean, default: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// Optional text index for search
donorSchema.index({ name: "text", bloodGroup: 1, location: 1, status: 1 });

export default mongoose.model("Donor", donorSchema);
