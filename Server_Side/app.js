import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import donorRoutes from "./routes/donorRoute.js";
import requestRoutes from "./routes/requestRoute.js";
import eventRoutes from "./routes/eventRoute.js";
import contactRoutes from "./routes/contactRoute.js";

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://full-stack-blood-donation-system.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);

// Root
app.get("/", (req, res) => res.send("API is running 🚀"));

// Error middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));