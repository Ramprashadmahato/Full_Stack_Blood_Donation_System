import React, { useState, useEffect, useContext } from "react";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../services/eventService";
import { AuthContext } from "../context/AuthContext";
import Alert from "../Components/Alert";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function EventDashboard() {
  const { token } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "", location: "" });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEventData, setEditingEventData] = useState({});

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const data = await getEvents(token);
      setEvents(data);
    } catch (err) {
      console.error("Fetch events error:", err);
      setAlert({ message: "Failed to load events", type: "error" });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Input handlers
  const handleChange = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditingEventData({ ...editingEventData, [e.target.name]: e.target.value });

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date) {
      setAlert({ message: "Title and Date are required", type: "error" });
      return;
    }
    try {
      const payload = { ...newEvent, date: new Date(newEvent.date).toISOString() };
      const res = await addEvent(payload, token);
      setEvents((prev) => [...prev, res.event || res]);
      setAlert({ message: "Event created successfully!", type: "success" });
      setNewEvent({ title: "", description: "", date: "", location: "" });
    } catch (err) {
      console.error("Add event error:", err);
      setAlert({ message: err.message || "Failed to create event", type: "error" });
    }
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await deleteEvent(id, token);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      setAlert({ message: res.message || "Event deleted successfully!", type: "success" });
    } catch (err) {
      console.error("Delete event error:", err);
      setAlert({ message: err.message || "Failed to delete event", type: "error" });
    }
  };

  // Start editing
  const handleEditEvent = (event) => {
    setEditingEventId(event._id);
    setEditingEventData({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      location: event.location,
    });
  };

  // Save updated event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...editingEventData, date: new Date(editingEventData.date).toISOString() };
      const res = await updateEvent(editingEventId, payload, token);
      setEvents((prev) => prev.map((e) => (e._id === editingEventId ? res.event || res : e)));
      setAlert({ message: "Event updated successfully!", type: "success" });
      setEditingEventId(null);
      setEditingEventData({});
    } catch (err) {
      console.error("Update event error:", err);
      setAlert({ message: err.message || "Failed to update event", type: "error" });
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingEventId(null);
    setEditingEventData({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Admin Event Dashboard</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Create, manage, and monitor all events. Notifications are sent to all users automatically.
        </p>
      </section>

      <div className="p-6 max-w-6xl mx-auto flex-1">
        {alert.message && <Alert message={alert.message} type={alert.type} />}

        {/* Add Event Form */}
        <form onSubmit={handleAddEvent} className="mb-8 p-6 bg-white shadow-2xl rounded-2xl">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaPlus /> Create New Event
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} className="p-3 border rounded" required />
            <input type="date" name="date" value={newEvent.date} onChange={handleChange} className="p-3 border rounded" required />
            <input type="text" name="location" placeholder="Location" value={newEvent.location} onChange={handleChange} className="p-3 border rounded" />
            <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleChange} className="p-3 border rounded col-span-1 md:col-span-2" />
          </div>
          <button type="submit" className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Add Event
          </button>
        </form>

        {/* Events Table */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-red-500 text-white text-left">
                <th className="py-3 px-4">SN</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id} className="border-b hover:bg-gray-100">
                  {editingEventId === event._id ? (
                    <>
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">
                        <input type="text" name="title" value={editingEventData.title} onChange={handleEditChange} className="p-2 border rounded w-full" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="date" name="date" value={editingEventData.date} onChange={handleEditChange} className="p-2 border rounded w-full" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="text" name="location" value={editingEventData.location} onChange={handleEditChange} className="p-2 border rounded w-full" />
                      </td>
                      <td className="py-2 px-4 flex gap-2">
                        <button onClick={handleUpdateEvent} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                          <FaEdit /> Save
                        </button>
                        <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{event.title}</td>
                      <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{event.location || "No location"}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button onClick={() => handleEditEvent(event)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          <FaEdit /> Edit
                        </button>
                        <button onClick={() => handleDeleteEvent(event._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
