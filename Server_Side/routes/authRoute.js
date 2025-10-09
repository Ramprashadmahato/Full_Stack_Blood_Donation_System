import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Single image upload field called 'profileImage'
router.post("/register", upload.single("profileImage"), registerUser); // <-- added multer middleware
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

export default router;
