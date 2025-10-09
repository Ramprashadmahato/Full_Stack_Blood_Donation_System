import express from "express";
import { createRequest, getRequests,getAllRequests, updateRequestStatus, deleteRequest } from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Donors can create requests
router.post("/", protect, createRequest);


// Admin can get all requests
router.get("/", protect,  getRequests);

// for user view only 
router.get("/all", protect,  getAllRequests);

// Admin can update request status
router.put("/:id", updateRequestStatus);

// Admin can delete a request
router.delete("/:id", protect, deleteRequest);

export default router;
