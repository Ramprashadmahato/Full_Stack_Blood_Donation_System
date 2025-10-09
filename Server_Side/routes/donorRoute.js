import express from "express";
import {
  createDonorProfile,
  getDonors,
  getAllDonations,
  deleteDonor,
  updateDonor,
} from "../controllers/donorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a donor profile (any logged-in user)
router.post("/", protect, createDonorProfile);

// Get donors:
// - Admin: all donors
// - Regular user: only own donor profile
router.get("/", protect, getDonors);

//get all donors for user view
router.get("/all", protect, getAllDonations);

// Update donor (admin can update all fields including status, owner can update their own info except status)
router.put("/:id", protect, updateDonor);

// Delete donor (admin only)
router.delete("/:id", protect, deleteDonor);

export default router;
