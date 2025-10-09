import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">🚫</h1>
        <h2 className="text-3xl font-bold mb-2">Unauthorized Access</h2>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page. Please contact the administrator if you believe this is an error.
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
