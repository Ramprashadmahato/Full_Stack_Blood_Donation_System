import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { getBloodRequests } from "../services/requestService";

export default function RequestReports() {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch requests from backend
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
        const data = await getBloodRequests(token);

        // Ensure data is an array
        if (!Array.isArray(data)) {
          setError("❌ You do not have permission to view requests or server returned invalid data.");
          setRequests([]);
        } else {
          setRequests(data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blood requests:", err);
        setError("❌ Failed to load blood requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
      request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.date?.includes(searchTerm) ||
      request.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Request Reports</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View all your past blood requests, their status, and details.
        </p>
      </section>

      {/* Search Bar */}
      <div className="w-150 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search by name, date, blood group, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Request Table */}
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
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Blood Group</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request, index) => (
                  <tr key={request._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{request.name}</td>
                    <td className="py-3 px-4">{request.bloodGroup}</td>
                    <td className="py-3 px-4">{request.quantity}</td>
                    <td className="py-3 px-4">
                      {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        request.status === "approved"
                          ? "text-green-600"
                          : request.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {request.status ? request.status.charAt(0).toUpperCase() + request.status.slice(1) : "-"}
                    </td>
                    <td className="py-3 px-4">{request.location}</td>
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
