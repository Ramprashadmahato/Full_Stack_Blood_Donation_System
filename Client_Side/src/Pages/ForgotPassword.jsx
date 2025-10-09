import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import DoctorImage from "../Images/Blood.png"; // doctor / blood illustration

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    console.log("Password reset requested for:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Forgot Your Password?
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Enter your registered email and we’ll send you instructions to reset
          your password.
        </p>
      </section>

      {/* Form + Image Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center py-16 px-6 max-w-7xl mx-auto gap-12">
        {/* Form */}
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full lg:w-1/2 border border-gray-100">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold shadow-sm">
              ✅ Password reset link sent successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            <Button text="Send Reset Link" type="submit" variant="primary" />
          </form>

          <p className="mt-8 text-center text-gray-600">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-red-500 font-bold hover:underline transition"
            >
              Login here
            </a>
          </p>
        </div>

        {/* Doctor Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center relative">
          <div className="absolute -z-10 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-50"></div>
          <img
            src={DoctorImage}
            alt="Doctor Illustration"
            className="w-full max-w-md rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
