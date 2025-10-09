import BloodRequest from "../models/BloodRequest.js";

// Create Blood Request
export const createRequest = async (req, res) => {
  try {
    const {
      name,
      bloodGroup,
      quantity,
      phone,
      email,
      location,
      urgency,
      message
    } = req.body;

    const request = await BloodRequest.create({
      user: req.user._id,   // ✅ match schema
      name,
      bloodGroup,
      quantity,
      phone,
      email,
      location,
      urgency,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("Error creating blood request:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// Get all Blood Requests or user-specific requests
export const getRequests = async (req, res) => {
  try {
    let query = {};

    // If not admin, only fetch the logged-in user's requests
    if (req.user.role !== "admin") {
      query.user = req.user._id; 
      // If you used "recipient" instead of "donor" in schema, change accordingly
    }

    const requests = await BloodRequest.find(query).sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all Blood Requests (for admin & recipients)
export const getAllRequests = async (req, res) => {
  try {
    // Fetch all requests, no restriction by user
    const requests = await BloodRequest.find().sort({ createdAt: -1 }).populate(
      "user",
      "name email"
    ); // optional: populate user info

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Error fetching all requests:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Update Blood Request Status
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await BloodRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    const updated = await request.save();
    res.json(updated);
  } catch (error) {
    console.error("Error updating request status:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};