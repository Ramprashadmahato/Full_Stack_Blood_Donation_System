const API_BASE = import.meta.env.VITE_API_URL;

// Get all blood requests (admin)
export const getBloodRequests = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Get all blood requests (for admin & recipients)
export const getAllBloodRequests = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/requests/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data; // { success: true, requests: [...] }
  } catch (error) {
    console.error("Error fetching all requests:", error.message);
    throw error;
  }
};

// Add blood request
export const addBloodRequest = async (requestData, token) => {
  try {
    const res = await fetch(`${API_BASE}/requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Update blood request (status or any field)
export const updateRequestStatus = async (requestId, updateData, token) => {
  try {
    const res = await fetch(`${API_BASE}/requests/${requestId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Request update failed:", err.message);
    throw err;
  }
};


// DELETE request
export const deleteBloodRequest = async (requestId, token) => {
  const res = await fetch(`${API_BASE}/requests/${requestId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return await res.json();
};