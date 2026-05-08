import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { getAllDonors } from "../services/donorService";

export default function DonationHistory() {
  const { token } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      if (!token) {
        setError("❌ You must be logged in to view all donations.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await getAllDonors(token);

        if (data.success) {
          const formatted = data.donors.map((d) => ({
            id: d._id,
            name: d.name,
            date: d.lastDonation?.split("T")[0] || "N/A",
            bloodGroup: d.bloodGroup,
            location: d.location,
            status: d.status || "pending",
          }));
          setDonations(formatted);
        } else {
          setError("❌ Failed to load donations.");
        }
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("❌ Failed to load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [token]);

  const filteredDonations = donations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.date.includes(searchTerm) ||
      d.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          All Donations History
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View all donations submitted so far
        </p>
      </section>

      {/* Search Bar */}
      <div className="w-150 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search by name, date, blood group, location, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Donations Table */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading donations...</p>
          ) : error ? (
            <p className="text-center text-red-600 py-10">{error}</p>
          ) : filteredDonations.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No donations found.</p>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-red-500 text-white text-left">
                  <th className="py-3 px-4">SN</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Blood Group</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation, index) => (
                  <tr key={donation.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{donation.name}</td>
                    <td className="py-3 px-4">{donation.date}</td>
                    <td className="py-3 px-4">{donation.bloodGroup}</td>
                    <td className="py-3 px-4">{donation.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white font-semibold ${
                          donation.status === "pending"
                            ? "bg-yellow-500"
                            : donation.status === "approved"
                            ? "bg-green-500"
                            : donation.status === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {donation.status}
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
