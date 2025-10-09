import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import { getDonors } from "../services/donorService";
import { AuthContext } from "../context/AuthContext"; // assumes you have AuthContext for token

export default function MatchedDonors() {
  const { token } = useContext(AuthContext); // get token from context
  const [donors, setDonors] = useState([]);
  const [searchGroup, setSearchGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch donors from backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getDonors(token);

        // Your service returns: { success: true, donors: [...] }
        if (data.success) {
          setDonors(data.donors || []);
        } else {
          setError("Failed to fetch donors.");
        }
      } catch (err) {
        console.error("MatchedDonors fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDonors();
    }
  }, [token]);

  // Filter donors by blood group (case-insensitive)
  const filteredDonors = donors.filter((donor) =>
    donor.bloodGroup.toLowerCase().includes(searchGroup.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <section className="bg-red-500 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Matched Donors</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Find donors matching your required blood group.
        </p>
      </section>

      {/* Search */}
      <div className="w-100 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Enter blood group (e.g., A+, O-, AB+)"
            value={searchGroup}
            onChange={(e) => setSearchGroup(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Donors Table */}
      <div className="max-w-6xl mx-auto px-4 mt-8 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading donors...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left py-3 px-4">SN</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Blood Group</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor, index) => (
                  <tr
                    key={donor._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{donor.name}</td>
                    <td className="py-3 px-4">{donor.bloodGroup}</td>
                    <td className="py-3 px-4">{donor.location}</td>
                    <td className="py-3 px-4">{donor.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-gray-500">
                    No matched donors found.
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
