import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import DoctorImage from "../Images/Blood.png";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire("Error", "Please enter both email and password.", "error");
      return;
    }

    try {
      setLoading(true);
      const result = await login(formData); // call login from AuthContext
      setLoading(false);

      if (result.success) {
        Swal.fire({
          title: "Login Successful 🎉",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "Go to Home",
        }).then(() => {
          navigate("/"); // redirect after login
        });

        setFormData({ email: "", password: "" });
      } else {
        Swal.fire("Login Failed", result.message || "Invalid credentials", "error");
      }
    } catch (err) {
      setLoading(false);
      Swal.fire("Error", "Server error. Please try again later.", "error");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome Back!
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Login to access your account and manage your emergency requests or volunteer activities.
        </p>
      </section>

      {/* Form + Image Section */}
      <section className="flex flex-col lg:flex-row items-stretch justify-center py-16 px-6 max-w-7xl mx-auto gap-12">
        {/* Login Form */}
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full lg:w-1/2 flex flex-col justify-center border border-gray-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            <Button
              text={loading ? "Logging in..." : "Login"}
              type="submit"
              variant="primary"
            />
          </form>

          <div className="mt-6 flex justify-between text-gray-600">
            <a
              href="/forgot-password"
              className="text-red-500 font-semibold hover:underline"
            >
              Forgot Password?
            </a>
            <a
              href="/register"
              className="text-red-500 font-semibold hover:underline"
            >
              Register
            </a>
          </div>
        </div>

        {/* Doctor Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative">
          <div className="absolute -z-10 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-50"></div>
          <img
            src={DoctorImage}
            alt="Doctor Illustration"
            className="w-full max-w-md h-full object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
