import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaHandsHelping, FaHistory } from "react-icons/fa";

export default function RecipientDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome, Recipient!
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Access your dashboard to manage blood requests, track status, and view donation history easily.
        </p>
      </section>

      {/* Quick Action Cards */}
      <section className="py-20 max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <Link
          to="/request-blood"
          className="bg-red-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center gap-5"
        >
          <FaHeartbeat className="text-5xl" />
          <h3 className="text-2xl font-bold">Request Blood</h3>
          <p className="text-gray-100 text-center">
            Quickly request blood for emergencies and urgent needs.
          </p>
        </Link>

        <Link
          to="/request-report"
          className="bg-green-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center gap-5"
        >
          <FaHandsHelping className="text-5xl" />
          <h3 className="text-2xl font-bold">View Requests</h3>
          <p className="text-gray-100 text-center">
            Track all your pending and completed blood requests.
          </p>
        </Link>

        <Link
          to="/request-history"
          className="bg-yellow-400 text-red-700 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center gap-5"
        >
          <FaHistory className="text-5xl" />
          <h3 className="text-2xl font-bold">Request History</h3>
          <p className="text-red-700 text-center">
            Check all past blood requests and donation records.
          </p>
        </Link>
      </section>

      {/* Optional Footer Section */}
      <Footer />
    </div>
  );
}
