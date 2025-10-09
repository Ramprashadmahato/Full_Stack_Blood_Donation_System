import Donor from "../models/Donor.js";

// Create donor profile
export const createDonorProfile = async (req, res) => {
  try {
    const { name, age, bloodGroup, phone, email, location, lastDonation, weight, diseases } = req.body;

    if (!name || !age || !bloodGroup || !phone || !email || !location) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const donor = await Donor.create({
      user: req.user._id,
      name,
      age,
      bloodGroup,
      phone,
      email,
      location,
      lastDonation: lastDonation || null,
      weight: weight || null,
      diseases: diseases || "None",
    });

    res.status(201).json(donor);
  } catch (error) {
    console.error("createDonorProfile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get donors (all for admin, own for user)
// Get donors
// Admin: all donors
// Donor: only own donations
// Get donors (all for admin, own for donor)
export const getDonors = async (req, res) => {
  try {
    let query = {};

    // If not admin, only get the logged-in donor's own record
    if (req.user.role !== "admin") {
      query.user = req.user._id;
    }

    // Optional search
    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { bloodGroup: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const donors = await Donor.find(query).populate("user", "name email profileImage");

    res.status(200).json({
      success: true,
      donors,
    });
  } catch (error) {
    console.error("getDonors error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// donor user can access all details for view 
export const getAllDonations = async (req, res) => {
  try {
    const donors = await Donor.find()
      .populate("user", "name email profileImage")
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      donors,
    });
  } catch (error) {
    console.error("getAllDonations error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update donor profile (admin or owner)
export const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    // Only owner or admin
    if (req.user.role !== "admin" && donor.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Only admin can update status
    if (req.body.status && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can change status" });
    }

    const updatedData = {
      name: req.body.name || donor.name,
      age: req.body.age || donor.age,
      bloodGroup: req.body.bloodGroup || donor.bloodGroup,
      phone: req.body.phone || donor.phone,
      email: req.body.email || donor.email,
      location: req.body.location || donor.location,
      lastDonation: req.body.lastDonation || donor.lastDonation,
      weight: req.body.weight || donor.weight,
      diseases: req.body.diseases || donor.diseases,
      status: req.body.status || donor.status,
    };

    const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json({ success: true, donor: updatedDonor });
  } catch (error) {
    console.error("updateDonor error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete donor (admin only)
export const deleteDonor = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    await donor.deleteOne();
    res.status(200).json({ success: true, message: "Donor deleted" });
  } catch (err) {
    console.error("deleteDonor error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
