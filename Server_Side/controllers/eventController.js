import Event from "../models/Event.js";
import User from "../models/User.js";
import { sendNotification } from "../utils/notificationService.js";

// Create Event + Notify Users (Admin only)
export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description, date, location, status, isPublic } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      status: status || "upcoming",
      isPublic: isPublic !== undefined ? isPublic : true,
      createdBy: req.user._id,
    });

    // Notify all users
    const users = await User.find({}); 
    const notifications = users.map(user => {
      const emailTo = user.email || null;
      const smsTo = user.phone || null;
      const messageText = `Hello ${user.name},\n\nA new event has been scheduled:\nTitle: ${title}\nDescription: ${description || "N/A"}\nDate: ${new Date(date).toLocaleString()}\nLocation: ${location || "N/A"}\n\nBest Regards,\nSmart Blood Donation Team`;

      return sendNotification({
        emailTo,
        smsTo,
        subject: `New Event: ${title}`,
        message: messageText
      });
    });

    await Promise.all(notifications);

    const populatedEvent = await event.populate("createdBy", "name email");
    res.status(201).json({ message: "Event created successfully and notifications sent", event: populatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    let events;
    if (req.user.role === "admin") {
      events = await Event.find().sort({ date: 1 }).populate("createdBy", "name email");
    } else {
      events = await Event.find({ isPublic: true }).sort({ date: 1 }).populate("createdBy", "name email");
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== "admin" && !event.isPublic) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event (Admin only)
export const updateEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    Object.assign(event, req.body);
    const updated = await event.save();
    const populatedUpdated = await updated.populate("createdBy", "name email");
    res.json({ message: "Event updated successfully", event: populatedUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event (Admin only)
// Delete Event (Admin only)
export const deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Fix: use deleteOne instead of remove
    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
