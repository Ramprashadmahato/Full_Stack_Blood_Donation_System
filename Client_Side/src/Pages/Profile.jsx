import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateUserProfile } from "../services/userService";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user profile
  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getProfile(token);
      if (res.success) {
        setUser(res.user);
        setFormData({
          name: res.user.name ?? "",
          email: res.user.email ?? "",
          password: "",
        });
        setPreviewImage(
          res.user.profileImage
            ? `${API_BASE.replace("/api", "")}${res.user.profileImage.startsWith("/") ? "" : "/"}${res.user.profileImage}`
            : null
        );
      } else {
        setMessage("❌ " + res.message);
      }
    } catch (err) {
      setMessage("❌ Failed to fetch profile");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    if (file) setPreviewImage(URL.createObjectURL(file)); // instant preview
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (profileFile) data.append("profileImage", profileFile);

    try {
      const res = await updateUserProfile(data, token, true);
      if (res.success) {
        // Update user state immediately
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
          profileImage: profileFile
            ? URL.createObjectURL(profileFile)
            : user.profileImage,
        };
        setUser(updatedUser);
        setEditing(false);
        setProfileFile(null);
        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage("❌ Update failed: " + res.message);
      }
    } catch (err) {
      setMessage("❌ Update failed");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return <p className="text-center mt-20">User not found</p>;

  const profileImageURL = previewImage
    ? previewImage
    : user?.profileImage
    ? `${API_BASE.replace("/api", "")}${user.profileImage.startsWith("/") ? "" : "/"}${user.profileImage}`
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Profile Header */}
      <section className="bg-red-500 text-white py-16 text-center">
        {profileImageURL ? (
          <img
            src={profileImageURL}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-white flex items-center justify-center text-red-500 font-bold text-xl shadow-lg">
            {user?.name?.charAt(0) ?? "U"}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          {user?.name ?? "User"}'s Profile
        </h1>
      </section>

      {/* Profile Details */}
      <section className="flex justify-center py-16 px-6">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          {message && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold shadow-sm">
              {message}
            </div>
          )}

          {!editing ? (
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {user?.name ?? ""}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user?.email ?? ""}
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  text="Edit Profile"
                  variant="primary"
                  onClick={() => setEditing(true)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              <div>
                <label className="font-semibold">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              <div>
                <label className="font-semibold">Password (optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <Button text="Save Changes" variant="primary" onClick={handleUpdate} />
                <Button text="Cancel" variant="secondary" onClick={() => setEditing(false)} />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
