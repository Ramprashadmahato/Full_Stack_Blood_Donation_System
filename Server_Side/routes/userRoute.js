import express from "express";
import upload from "../middleware/multer.js"; // default import
import { getUserProfile, updateUserProfile,getAllUsers,updateUser,deleteUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);

/* ==========================
   🔹 ADMIN ROUTES
   ========================== */
// Get all users (Admin only)
router.get("/", protect,  getAllUsers);

// Update any user (Admin only)
router.put("/:id", protect,  updateUser);

// Delete any user (Admin only)
router.delete("/:id", protect,  deleteUser);

export default router;
