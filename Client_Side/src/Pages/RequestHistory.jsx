import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { getAllBloodRequests } from "../services/requestService"; // import service

export default function RequestHistory() {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      if (!token) {
        setError("❌ You must be logged in to view requests.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await getAllBloodRequests(token); // use service
        if (data.success) {
          setRequests(data.requests || data); // depends if backend returns {success: true, requests: [...] } or array directly
        } else {
          setError("❌ Failed to load requests.");
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("❌ Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const filteredRequests = requests.filter(
    (r) =>
      r.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">All Blood Requests History</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View all blood requests submitted by users.
        </p>
      </section>

      {/* Search Bar */}
      <div className="w-150 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg bg-white">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search by name, blood group, location, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Requests Table */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading requests...</p>
          ) : error ? (
            <p className="text-center text-red-600 py-10">{error}</p>
          ) : filteredRequests.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No requests found.</p>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-red-500 text-white text-left">
                  <th className="py-3 px-4">SN</th>
                  <th className="py-3 px-4">Requester</th>
                  <th className="py-3 px-4">Blood Group</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request, index) => (
                  <tr key={request._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{request.user?.name || "N/A"}</td>
                    <td className="py-3 px-4">{request.bloodGroup}</td>
                    <td className="py-3 px-4">{request.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white font-semibold ${
                          request.status === "pending"
                            ? "bg-yellow-500"
                            : request.status === "approved"
                            ? "bg-green-500"
                            : request.status === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {request.status}
                      </span>
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
