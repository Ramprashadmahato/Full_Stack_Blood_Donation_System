import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import DoctorImage from "../Images/Blood.png";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: " ", 
  });
  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role); // include role
    if (profileFile) data.append("profileImage", profileFile);

    try {
      setLoading(true);
      const result = await register(data);
      setLoading(false);

      if (result.success) {
        Swal.fire({
          title: "Registration Successful 🎉",
          text: "Your account has been created successfully!",
          icon: "success",
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/login");
        });

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: " ",
        });
        setProfileFile(null);
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Server error. Please try again later.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Create Your Account
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Join our community to request help, volunteer, and save lives.
        </p>
      </section>

      {/* Form + Image Section */}
      <section className="flex flex-col lg:flex-row items-stretch justify-center py-16 px-6 max-w-7xl mx-auto gap-12">
        {/* Registration Form */}
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full lg:w-1/2 flex flex-col justify-center border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center font-semibold shadow-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            {/* Email */}
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
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            {/* Password */}
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
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Register As
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                required
              >
                <option >Select your role</option>
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Profile Image (Optional)
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <Button
              text={loading ? "Registering..." : "Register"}
              type="submit"
              variant="primary"
            />
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-500 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
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
