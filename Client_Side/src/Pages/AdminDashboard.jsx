import React, { useState, useEffect, useContext } from "react";
import {
  FaUsers,
  FaTint,
  FaHandHoldingHeart,
  FaChartBar,
  FaBars,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { getDonors } from "../services/donorService";
import { getBloodRequests } from "../services/requestService";
import { getAllUsers } from "../services/userService";
import { getEvents } from "../services/eventService"; // <-- import events API
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const { token, logout, user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Backend data states
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0); // <-- total events state

  // Chart data state
  const [chartData, setChartData] = useState([]);

  const profileImageURL = user?.profileImage
    ? `${API_BASE.replace("/api", "")}${
        user.profileImage.startsWith("/") ? "" : "/"
      }${user.profileImage}`
    : null;

  useEffect(() => {
    if (!token) return;

    const fetchDashboardData = async () => {
      try {
        const usersData = await getAllUsers(token);
        const donorsData = await getDonors(token);
        const requestsData = await getBloodRequests(token);
        const eventsData = await getEvents(token); // <-- fetch events

        const usersCount = Array.isArray(usersData?.users) ? usersData.users.length : 0;
        const donorsCount = Array.isArray(donorsData?.donors) ? donorsData.donors.length : 0;
        const requestsCount = Array.isArray(requestsData) ? requestsData.length : 0;
        const eventsCount = Array.isArray(eventsData) ? eventsData.length : 0; // <-- events count

        setTotalUsers(usersCount);
        setTotalDonors(donorsCount);
        setTotalRequests(requestsCount);
        setTotalEvents(eventsCount); // <-- set total events

        setChartData([
          { name: "Users", count: usersCount },
          { name: "Donors", count: donorsCount },
          { name: "Requests", count: requestsCount },
          { name: "Events", count: eventsCount }, // <-- include in chart
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-20"} bg-gray-800 text-gray-100 flex flex-col transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className={`font-bold text-lg ${!isSidebarOpen && "hidden"} md:block`}>Admin Panel</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-300 hover:text-white">
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <a href="/manage-donation" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
            <FaUsers /> {isSidebarOpen && <span>Manage Donors</span>}
          </a>
          <a href="/match-donor" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
            <FaTint /> {isSidebarOpen && <span>Blood Inventory</span>}
          </a>
          <a href="/manage-request" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
            <FaHandHoldingHeart /> {isSidebarOpen && <span>Blood Requests</span>}
          </a>
          <a href="/event" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
            <FaChartBar /> {isSidebarOpen && <span>Events</span>}
          </a>
          <a href="/manage-user" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition">
            <FaUserCog /> {isSidebarOpen && <span>Users</span>}
          </a>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={logout} className="flex items-center gap-3 w-full text-left hover:bg-red-600 p-2 rounded transition">
            <FaSignOutAlt /> {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            {profileImageURL ? (
              <img src={profileImageURL} alt={user?.name || "Admin"} className="w-10 h-10 rounded-full border object-cover" />
            ) : (
              <FaUserCog size={34} />
            )}
            <span className="font-medium">{user?.name || "Admin"}</span>
          </div>
        </header>

        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition">
            <FaUserCog className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold mt-2">{totalUsers}</p>
          </div>

          {/* Total Donors */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition">
            <FaUsers className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Total Donors</h3>
            <p className="text-2xl font-bold mt-2">{totalDonors}</p>
          </div>

          {/* Total Requests */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition">
            <FaHandHoldingHeart className="text-3xl text-yellow-600 mb-3" />
            <h3 className="text-lg font-semibold">Total Requests</h3>
            <p className="text-2xl font-bold mt-2">{totalRequests}</p>
          </div>

          {/* Total Events */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition">
            <FaChartBar className="text-3xl text-green-600 mb-3" />
            <h3 className="text-lg font-semibold">Total Events</h3>
            <p className="text-2xl font-bold mt-2">{totalEvents}</p>
          </div>
        </main>

        {/* Dashboard Chart */}
        <div className="p-6 mt-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
