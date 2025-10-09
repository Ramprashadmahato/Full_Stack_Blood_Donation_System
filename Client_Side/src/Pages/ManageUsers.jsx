import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch, FaTrash, FaUserEdit, FaTimes } from "react-icons/fa";
import { getAllUsers, deleteUser, updateUser } from "../services/userService";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ success message state
  const [editUser, setEditUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", role: "", status: "" });

  const token = localStorage.getItem("token");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        if (!token) throw new Error("You must be logged in as admin.");
        const res = await getAllUsers(token);
        if (res.success) setUsers(res.users);
        else throw new Error(res.message || "Failed to fetch users.");
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm?.toLowerCase() || "") ||
      (user.email?.toLowerCase() || "").includes(searchTerm?.toLowerCase() || "") ||
      (user.role?.toLowerCase() || "").includes(searchTerm?.toLowerCase() || "") ||
      (user.status?.toLowerCase() || "").includes(searchTerm?.toLowerCase() || "");
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await deleteUser(id, token);
      if (res.success) {
        setUsers(users.filter((u) => u._id !== id));
        setSuccess("User deleted successfully."); // ✅ success message
        setTimeout(() => setSuccess(""), 3000);
      } else throw new Error(res.message || "Failed to delete user.");
    } catch (err) {
      setError(err.message || "Failed to delete user.");
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setEditUser(user);
    setEditData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      status: user.status || "Active",
    });
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditUser(null);
    setEditData({ name: "", email: "", role: "", status: "" });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(editUser._id, editData, token);
      if (res.success) {
        setUsers(users.map((u) => (u._id === editUser._id ? res.user : u)));
        setSuccess("User updated successfully!"); // ✅ success message
        setTimeout(() => setSuccess(""), 3000);
        closeEditModal();
      } else throw new Error(res.message || "Failed to update user.");
    } catch (err) {
      setError(err.message || "Failed to update user.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-red-500 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Manage Users</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View, search, edit, and manage all registered users in the system.
        </p>
      </section>

      {/* Success / Error Messages */}
      <div className="max-w-6xl mx-auto mt-4 px-4">
        {success && <p className="text-green-600 py-2">{success}</p>}
        {error && <p className="text-red-600 py-2">{error}</p>}
      </div>

      {/* Search & Status Filter */}
      <div className="w-150 mx-auto px-4 mt-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-lg flex-1">
          <FaSearch className="text-red-600 px-3 text-xl" />
          <input
            type="text"
            placeholder="Search by name, email, role, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Deactivate">Deactivate</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="max-w-6xl mx-auto px-4 mt-8 overflow-x-auto">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left py-3 px-4">SN</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.name || "-"}</td>
                    <td className="py-3 px-4">{user.email || "-"}</td>
                    <td className="py-3 px-4">{user.role || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-white ${
                          user.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {user.status || "Unknown"}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <FaUserEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeEditModal}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="role"
                value={editData.role}
                onChange={handleEditChange}
                placeholder="Role"
                className="border p-2 rounded"
                required
              />
              <select
                name="status"
                value={editData.status}
                onChange={handleEditChange}
                className="border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Deactivate">Deactivate</option>
              </select>
              <button
                type="submit"
                className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
