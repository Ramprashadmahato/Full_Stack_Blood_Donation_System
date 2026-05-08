import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* 404 Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-700 mb-6 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go to Home
        </Link>
        {/* Optional Illustration */}
        <div className="mt-10">
          <img
            src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1812.jpg?w=740&t=st=1725804694~exp=1725808294~hmac=abcd1234"
            alt="404 Illustration"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
