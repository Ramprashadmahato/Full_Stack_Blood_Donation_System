import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute: restrict access by login and role
// user: current logged-in user object
// roles: array of allowed roles, e.g., ["admin", "donor"]
export default function ProtectedRoute({ user, roles, children }) {
  // If user info is not loaded yet, show a loader
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Logged in and authorized
  return children;
}
