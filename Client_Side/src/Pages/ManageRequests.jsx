import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { getBloodRequests, updateRequestStatus, deleteBloodRequest } from "../services/requestService";

export default function ManageRequests() {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // ✅ Success/error message

  // Fetch requests
  useEffect(() => {
    if (!token) return;

    const fetchRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getBloodRequests(token);
        setRequests(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("❌ Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  // Show message helper
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Hide after 3 seconds
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedRequest = await updateRequestStatus(id, { status: newStatus }, token);
      setRequests(requests.map(req => (req._id === id ? updatedRequest : req)));
      showMessage("✅ Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      showMessage("❌ Failed to update status.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await deleteBloodRequest(id, token);
      setRequests(requests.filter(req => req._id !== id));
      showMessage("✅ Request deleted successfully!");
    } catch (err) {
      console.error("Error deleting request:", err);
      showMessage("❌ Failed to delete request.");
    }
  };

  // Filter
  const filteredRequests = requests.filter(req => {
    const term = searchTerm.toLowerCase();
    return (
      (req.name || "").toLowerCase().includes(term) ||
      (req.bloodGroup || "").toLowerCase().includes(term) ||
      (req.location || "").toLowerCase().includes(term) ||
      (req.urgency || "").toLowerCase().includes(term) ||
      (req.status || "").toLowerCase().includes(term) ||
      String(req.quantity || "").includes(term)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-red-500 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Manage Requests</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View, update, or manage all blood requests efficiently.
        </p>
      </section>

      {/* Success/Error Message */}
      {message && (
        <div className="max-w-7xl mx-auto mt-4 px-4 py-3 text-center rounded-lg text-white font-semibold bg-green-500">
          {message}
        </div>
      )}

      {/* Search */}
      <div className="w-150 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search by name, blood group, location, urgency, quantity, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 mt-8 overflow-x-auto">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading requests...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-600">{error}</p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left py-3 px-4">SN</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Blood Group</th>
                <th className="text-left py-3 px-4">Units</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Urgency</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req, index) => (
                  <tr key={req._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{req.name || "N/A"}</td>
                    <td className="py-3 px-4">{req.bloodGroup || "N/A"}</td>
                    <td className="py-3 px-4">{req.quantity || "0"}</td>
                    <td className="py-3 px-4">{req.location || "N/A"}</td>
                    <td className="py-3 px-4">{req.urgency || "Normal"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white font-semibold ${
                          req.status === "pending"
                            ? "bg-yellow-500"
                            : req.status === "approved"
                            ? "bg-green-500"
                            : req.status === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {req.status || "pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      {req.status !== "approved" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "approved")}
                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(req._id, "rejected")}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800"
                          >
                            <FaTimes /> Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
}
