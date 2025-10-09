const API_BASE = import.meta.env.VITE_API_URL;

// Get all donors (admin)
// Get donors
// Admin: all donors
// Donor: only own donation
export const getDonors = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/donors`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch donors");
    }

    const data = await res.json(); // { success: true, donors: [...] }
    return data;
  } catch (err) {
    console.error("getDonors error:", err.message);
    throw err;
  }
};

// Get all donations (admin access)
export const getAllDonors = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/donors/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data; // { success: true, donors: [...] }
  } catch (error) {
    console.error("Error fetching donors:", error.message);
    throw error;
  }
};

// Add a donor
export const addDonor = async (donorData, token) => {
  try {
    const res = await fetch(`${API_BASE}/donors`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donorData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add donor");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("addDonor error:", error.message);
    throw error;
  }
};

// Delete donor
export const deleteDonor = async (id, token) => {
  try {
    const res = await fetch(`${API_BASE}/donors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete donor");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("deleteDonor error:", err.message);
    throw err;
  }
};

// Update donor
export const updateDonor = async (donorId, donorData, token) => {
  try {
    const res = await fetch(`${API_BASE}/donors/${donorId}`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donorData),
    });

    // Check if response failed
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update donor");
    }

    const data = await res.json();

    // Check backend success field
    if (!data.success) {
      throw new Error(data.message || "Failed to update donor");
    }

    // Return updated donor object
    return data.donor;
  } catch (error) {
    console.error("updateDonor error:", error.message);
    throw error;
  }
};
