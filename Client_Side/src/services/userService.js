const API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) console.warn("VITE_API_URL is not defined in .env file");

// ----------------- Get Profile -----------------
export const getProfile = async (token) => {
  if (!token) return { success: false, message: "Token is required" };

  try {
    const res = await fetch(`${API_BASE}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) return { success: false, message: data.message || "Failed to fetch profile" };

    return { success: true, user: data.user || data, message: data.message || "Profile fetched" };
  } catch (error) {
    console.error("getProfile error:", error);
    return { success: false, message: error.message || "Server error" };
  }
};

// ----------------- Update Profile -----------------
export const updateUserProfile = async (formData, token) => {
  if (!token) return { success: false, message: "Token is required" };

  try {
    const res = await fetch(`${API_BASE}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) return { success: false, message: data.message || "Update failed" };

    return { success: true, user: data.user || data, message: data.message || "Profile updated successfully" };
  } catch (error) {
    console.error("updateUserProfile error:", error);
    return { success: false, message: error.message || "Server error" };
  }
};

// ----------------- Get All Users only admin -----------------
export const getAllUsers = async (token) => {
  if (!token) return { success: false, message: "Token is required" };

  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) return { success: false, message: data.message || "Failed to fetch users" };

    return { success: true, users: data.users || [], message: "Users fetched successfully" };
  } catch (err) {
    console.error("getAllUsers error:", err);
    return { success: false, message: err.message || "Failed to fetch users" };
  }
};

// ----------------- Delete User only admin -----------------
export const deleteUser = async (id, token) => {
  if (!token) return { success: false, message: "Token is required" };

  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) return { success: false, message: data.message || "Delete failed" };

    return { success: true, message: data.message || "User deleted successfully" };
  } catch (error) {
    console.error("deleteUser error:", error);
    return { success: false, message: error.message || "Server error" };
  }
};

// ----------------- Update User only admin -----------------
export const updateUser = async (id, formData, token) => {
  if (!token) return { success: false, message: "Token is required" };

  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) return { success: false, message: data.message || "Update failed" };

    return { success: true, user: data.user || data, message: data.message || "User updated successfully" };
  } catch (error) {
    console.error("updateUser error:", error);
    return { success: false, message: error.message || "Server error" };
  }
};
