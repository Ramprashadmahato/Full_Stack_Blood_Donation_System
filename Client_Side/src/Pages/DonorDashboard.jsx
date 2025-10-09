import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaHandsHelping, FaHistory } from "react-icons/fa";

export default function DonorDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome, Donor!
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Access your dashboard to manage donations, requests, and volunteer activities.
        </p>
      </section>

      {/* Quick Action Cards */}
      <section className="py-20 max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <Link
          to="/donate-blood"
          className="bg-red-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center gap-5"
        >
          <FaHeartbeat className="text-5xl" />
          <h3 className="text-2xl font-bold">Request Help</h3>
          <p className="text-gray-100 text-center">
            Quickly request assistance in emergencies.
          </p>
        </Link>

        <Link
          to="/donation-report"
          className="bg-green-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center gap-5"
        >
          <FaHandsHelping className="text-5xl" />
          <h3 className="text-2xl font-bold">View Donations</h3>
          <p className="text-gray-100 text-center">
            Track all your pending and completed blood donation.
          </p>
        </Link>

        <Link
          to="/donation-history"
          className="bg-yellow-400 text-red-700 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center gap-5"
        >
          <FaHistory className="text-5xl" />
          <h3 className="text-2xl font-bold">Donation History</h3>
          <p className="text-red-700 text-center">
            Track all your past blood donations and contributions.
          </p>
        </Link>
      </section>

      {/* Optional Footer Section */}
      <Footer />
    </div>
  );
}
