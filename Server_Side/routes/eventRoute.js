import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth middleware

const router = express.Router();

// Routes
router.route("/")
  .get(protect, getEvents)       // Get all events
  .post(protect, createEvent);   // Create new event (admin only)

router.route("/:id")
  .get(protect, getEventById)    // Get single event
  .put(protect, updateEvent)     // Update event (admin only)
  .delete(protect, deleteEvent); // Delete event (admin only)

export default router;
