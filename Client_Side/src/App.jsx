import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // your auth context
import ProtectedRoute from "./context/ProtectedRoute";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import RequestBlood from "./Pages/RequestBlood";
import DonateBlood from "./Pages/DonateBlood";
import AdminDashboard from "./Pages/AdminDashboard";
import EventDashboard from "./Pages/EventDashboard"; // ✅ Added EventDashboard
import EventNotifications from "./Pages/EventNotifications";
import DonationHistory from "./Pages/DonationHistory";
import DonorDashboard from "./Pages/DonorDashboard";
import ManageDonations from "./Pages/ManageDonations";
import ManageRequests from "./Pages/ManageRequests";
import ManageUsers from "./Pages/ManageUsers";
import MatchedDonors from "./Pages/MatchedDonors";
import Profile from "./Pages/Profile";
import RecipientDashboard from "./Pages/RecipientDashboard";
import RequestHistory from "./Pages/RequestHistory";
import DonationReports from "./Pages/DonationReports";
import RequestReports from "./Pages/RequestReports";
import NotFound from "./Pages/NotFound";
import Unauthorized from "./Pages/Unauthorized";

export default function AppRoutes() {
  const { user } = useContext(AuthContext); // get logged-in user

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/donate-blood"
        element={
          <ProtectedRoute user={user} roles={["donor"]}>
            <DonateBlood />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-blood"
        element={
          <ProtectedRoute user={user} roles={["recipient"]}>
            <RequestBlood />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor-dashboard"
        element={
          <ProtectedRoute user={user} roles={["donor"]}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipient-dashboard"
        element={
          <ProtectedRoute user={user} roles={["recipient"]}>
            <RecipientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute user={user} roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin: Event Dashboard */}
      <Route
        path="/event"
        element={
          <ProtectedRoute user={user} roles={["admin"]}>
            <EventDashboard />
          </ProtectedRoute>
        }
      />
      {/* User: Event Notification */}
      <Route
        path="/update"
        element={
          <ProtectedRoute user={user} roles={["donor","recipient" ]}>
            <EventNotifications/>
          </ProtectedRoute>
        }
      />

      {/* Admin Management Routes */}
      <Route
        path="/manage-donation"
        element={
          <ProtectedRoute user={user} roles={["admin"]}>
            <ManageDonations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-request"
        element={
          <ProtectedRoute user={user} roles={["admin"]}>
            <ManageRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-user"
        element={
          <ProtectedRoute user={user} roles={["admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/match-donor"
        element={
          <ProtectedRoute user={user} roles={["admin"]}>
            <MatchedDonors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donation-report"
        element={
          <ProtectedRoute user={user}roles={["donor"]} >
            <DonationReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-report"
        element={
          <ProtectedRoute user={user} roles={["recipient"]} >
            <RequestReports />
          </ProtectedRoute>
        }
      />

      {/* Donor & Recipient History */}
      <Route
        path="/donation-history"
        element={
          <ProtectedRoute user={user} roles={["donor"]}>
            <DonationHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-history"
        element={
          <ProtectedRoute user={user} roles={["recipient"]}>
            <RequestHistory />
          </ProtectedRoute>
        }
      />

      {/* Profile for all roles */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user} roles={["admin", "user", "donor", "recipient"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Fallback routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
