const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to set headers
const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

// -------------------- ADMIN FUNCTIONS --------------------

// Get all events (admin sees all)
export const getEvents = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      headers: getHeaders(token),
    });

    if (!res.ok) throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Add a new event
export const addEvent = async (eventData, token) => {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(eventData),
    });

    if (!res.ok) throw new Error(`Failed to add event: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Update event by ID
export const updateEvent = async (eventId, eventData, token) => {
  try {
    const res = await fetch(`${API_BASE}/events/${eventId}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(eventData),
    });

    if (!res.ok) throw new Error(`Failed to update event: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId, token) => {
  try {
    const res = await fetch(`${API_BASE}/events/${eventId}`, { // <-- ensure /api/events
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      // Include the response text for debugging
      const text = await res.text();
      throw new Error(`Failed to delete event: ${res.status} ${res.statusText} - ${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// -------------------- USER FUNCTIONS --------------------
// Get single event by ID (can be used for detail page)
export const getEventById = async (eventId, token) => {
  if (!eventId) throw new Error("Event ID is required");
  
  try {
    const res = await fetch(`${API_BASE}/events/${eventId}`, {
      headers: getHeaders(token),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch event: ${res.status} ${res.statusText} - ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    throw error;
  }
};