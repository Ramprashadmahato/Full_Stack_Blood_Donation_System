import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Alert from "../Components/Alert";
import { getEvents } from "../services/eventService";
import { AuthContext } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";

export default function EventNotifications() {
  const { token, user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !user) return;

    const fetchEvents = async () => {
      setLoading(true);
      setAlert({ message: "", type: "" });
      try {
        const allEvents = await getEvents(token);

        const visibleEvents = allEvents.filter((event) => {
          if (user.role === "admin") return true;
          return event.isPublic; // donor/recipient see only public events
        });

        setEvents(visibleEvents);
        setLoading(false);
      } catch (err) {
        console.error("Fetch events error:", err);
        setAlert({ message: "Failed to load events.", type: "error" });
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token, user]);

  // Filter by search term
  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.date && new Date(event.date).toLocaleDateString().includes(searchTerm))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Event Notifications</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View all upcoming and past events relevant to your role.
        </p>
      </section>

      {/* Search */}
      <div className="w-150 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search by title, location, description, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Alerts */}
      {alert.message && (
        <div className="max-w-6xl mx-auto mt-6">
          <Alert message={alert.message} type={alert.type} />
        </div>
      )}

      {/* Event Table */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No events found.</p>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-red-500 text-white text-left">
                  <th className="py-3 px-4">SN</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={event._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-semibold">{event.title}</td>
                    <td className="py-3 px-4">
                      {event.date ? new Date(event.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 px-4">{event.location || "-"}</td>
                    <td className="py-3 px-4 line-clamp-2">{event.description || "-"}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        event.isPublic ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {event.isPublic ? "Public" : "Private"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
