import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://RamPrashad:rpxingh201@cluster0.ap6a3ql.mongodb.net/blood_donation?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
