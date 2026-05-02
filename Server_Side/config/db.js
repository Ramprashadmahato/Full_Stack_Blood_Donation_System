import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

// Fix for Windows SRV resolution issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(mongoURI, { family: 4 });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;