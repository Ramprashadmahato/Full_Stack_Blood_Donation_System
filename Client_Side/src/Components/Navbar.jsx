import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import Logo from "../Images/Logo.png";
import { AuthContext } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0); // ✅

  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  // Fetch unread notifications
  useEffect(() => {
    if (!token || !user) return;
    const fetchUnread = async () => {
      try {
        const res = await fetch(`${API_BASE}/events/unread-count`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };

    fetchUnread();

    // Optional: poll every 30s for new notifications
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [token, user]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setLogoutMessage("✅ You have been logged out successfully!");
    setTimeout(() => setLogoutMessage(""), 3000);
    navigate("/");
  };

  const handleBellClick = async () => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/events/mark-all-seen`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(0); // clear badge
      navigate("/update"); // go to notifications page
    } catch (err) {
      console.error("Failed to mark notifications as seen", err);
    }
  };

  const profileImageURL = user?.profileImage
    ? `${API_BASE.replace("/api", "")}${
        user.profileImage.startsWith("/") ? "" : "/"
      }${user.profileImage}`
    : null;

  return (
    <>
      <nav className="bg-red-600 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-20 h-20 object-contain rounded-full" />
            <h5 className="font-bold text-white text-lg md:text-2xl leading-tight">
              Smart <br />
              <span className="text-white text-base md:text-xl">Blood Donation</span>
            </h5>
          </NavLink>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 md:gap-4 items-center">
          {user?.role === "admin" && (
            <NavLink
              to="/admin-dashboard"
              className="px-3 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Admin Dashboard
            </NavLink>
          )}

          <NavLink to="/" className="px-3 py-2 rounded hover:bg-red-700 transition-colors">Home</NavLink>
          <NavLink to="/about" className="px-3 py-2 rounded hover:bg-red-700 transition-colors">About</NavLink>
          <NavLink to="/contact" className="px-3 py-2 rounded hover:bg-red-700 transition-colors">Contact</NavLink>
          <NavLink to="/faq" className="px-3 py-2 rounded hover:bg-red-700 transition-colors">FAQ</NavLink>

          {/* Notification Bell */}
          {user && (user.role === "donor" || user.role === "recipient") && (
            <button
              onClick={handleBellClick}
              className="relative px-3 py-2 rounded hover:bg-red-700 transition-colors"
            >
              <FaBell className="text-2xl hover:text-yellow-300 transition cursor-pointer" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-yellow-400 text-red-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Role-based dashboard links */}
          {user?.role === "donor" && (
            <NavLink
              to="/donor-dashboard"
              className="px-3 py-2 rounded-l-full border-2 border-white hover:bg-white hover:text-red-600 transition-colors"
            >
              Donate Blood
            </NavLink>
          )}
          {user?.role === "recipient" && (
            <NavLink
              to="/recipient-dashboard"
              className="px-3 py-2 rounded-r-full border-2 border-white hover:bg-white hover:text-red-600 transition-colors"
            >
              Request Blood
            </NavLink>
          )}

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-3 py-2 rounded hover:bg-red-700 transition-colors"
            >
              {profileImageURL ? (
                <img
                  src={profileImageURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <FaUserCircle size={34} />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-red-600 rounded shadow-lg flex flex-col z-50">
                {!user ? (
                  <>
                    <NavLink to="/login" className="px-4 py-2 hover:bg-red-100" onClick={() => setDropdownOpen(false)}>Login</NavLink>
                    <NavLink to="/register" className="px-4 py-2 hover:bg-red-100" onClick={() => setDropdownOpen(false)}>Register</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/profile" className="px-4 py-2 hover:bg-red-100" onClick={() => setDropdownOpen(false)}>Profile</NavLink>
                    <button onClick={handleLogout} className="text-left px-4 py-2 hover:bg-red-100">Logout</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Success */}
      {logoutMessage && (
        <div className="fixed top-24 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {logoutMessage}
        </div>
      )}

      {/* Spacer */}
      <div className="h-28 md:h-28 mb-0"></div>
    </>
  );
}
