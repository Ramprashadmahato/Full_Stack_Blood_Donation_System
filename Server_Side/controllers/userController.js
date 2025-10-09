import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* ==========================
   🔹 Get Logged-in User Profile
   ========================== */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==========================
   🔹 Update Logged-in User Profile
   ========================== */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email.toLowerCase().trim();

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==========================
   🔹 Admin: Get All Users
========================== */
export const getAllUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role?.toLowerCase() !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==========================
   🔹 Admin: Delete User
========================== */
export const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.role?.toLowerCase() !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await user.deleteOne();
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ==========================
   🔹 Admin or Self: Update User
========================== */
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    if (!req.user) return res.status(403).json({ success: false, message: "Not authorized" });

    // Admin can update anyone; normal user can update only themselves
    if (req.user.role?.toLowerCase() !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email ? email.toLowerCase().trim() : user.email;

    if (role && req.user.role?.toLowerCase() === "admin") user.role = role;
    if (status && req.user.role?.toLowerCase() === "admin") user.status = status;

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
        profileImage: updatedUser.profileImage,
      },
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};