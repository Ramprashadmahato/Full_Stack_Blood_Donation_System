import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaSearch, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { getDonors, updateDonor, deleteDonor } from "../services/donorService";
import { AuthContext } from "../context/AuthContext";

export default function ManageDonations() {
  const { token, user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Admin only check
  useEffect(() => {
    if (!token || user?.role !== "admin") window.location.href = "/login";
  }, [token, user]);

  // Fetch donors
  useEffect(() => {
    if (!token) return;
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const res = await getDonors(token);
        const donorArray = res?.donors || [];
        const formattedData = donorArray.map(donor => ({
          id: donor._id,
          name: donor.name,
          bloodGroup: donor.bloodGroup,
          location: donor.location,
          lastDonation: donor.lastDonation?.split("T")[0] || "",
          status: donor.status,
        }));
        setDonations(formattedData);
      } catch (err) {
        console.error(err);
        showMessage("❌ Failed to load donations.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [token]);

  // Show success/error messages
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Update donor status
  const handleStatusChange = async (id, newStatus) => {
    if (updatingId) return;
    setUpdatingId(id);

    const currentStatus = donations.find(d => d.id === id)?.status;

    // Optimistic UI update
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));

    try {
      const updatedDonor = await updateDonor(id, { status: newStatus }, token);

      // Update state with returned donor
      setDonations(prev => prev.map(d => d.id === id ? { ...d, status: updatedDonor.status } : d));
      showMessage(`✅ Donor status updated to "${updatedDonor.status}"`);
    } catch (err) {
      console.error(err);
      showMessage("❌ Failed to update status.");
      // Revert UI
      setDonations(prev => prev.map(d => d.id === id ? { ...d, status: currentStatus } : d));
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete donor
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donor?")) return;
    try {
      await deleteDonor(id, token);
      setDonations(prev => prev.filter(d => d.id !== id));
      showMessage("✅ Donor deleted!");
    } catch (err) {
      console.error(err);
      showMessage("❌ Failed to delete donor.");
    }
  };

  // Filter donations
  const filteredDonations = donations.filter(d =>
    [d.name, d.bloodGroup, d.location, d.status].some(f =>
      f?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="bg-red-500 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Manage Donations</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Approve, reject, or delete donor records efficiently.
        </p>
      </section>

      {message && (
        <div className="max-w-6xl mx-auto mt-4 px-4 py-3 text-center rounded-lg text-white font-semibold bg-green-500">
          {message}
        </div>
      )}

      <div className="w-150 mx-auto px-4 mt-10">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 overflow-x-auto">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading donations...</p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left py-3 px-4">SN</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Blood Group</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Last Donation</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length > 0 ? filteredDonations.map((donation, idx) => (
                <tr key={donation.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{donation.name}</td>
                  <td className="py-3 px-4">{donation.bloodGroup}</td>
                  <td className="py-3 px-4">{donation.location}</td>
                  <td className="py-3 px-4">{donation.lastDonation}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-white font-semibold ${
                      donation.status === "pending" ? "bg-yellow-500" :
                      donation.status === "approved" ? "bg-green-500" :
                      donation.status === "rejected" ? "bg-red-500" : "bg-gray-400"
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    {donation.status !== "approved" && <>
                      <button
                        onClick={() => handleStatusChange(donation.id, "approved")}
                        disabled={updatingId === donation.id}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                      ><FaCheck /> Approve</button>
                      <button
                        onClick={() => handleStatusChange(donation.id, "rejected")}
                        disabled={updatingId === donation.id}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      ><FaTimes /> Reject</button>
                    </>}
                    <button
                      onClick={() => handleDelete(donation.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                    ><FaTrash /> Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-gray-500">
                    No donations found.
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
