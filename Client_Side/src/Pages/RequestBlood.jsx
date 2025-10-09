import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTint } from "react-icons/fa";
import ReciveImage from "../Images/Recive.png";
import { addBloodRequest } from "../services/requestService";
import { AuthContext } from "../context/AuthContext";

export default function RequestBlood() {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    quantity: "", // ✅ renamed from 'units' to 'quantity'
    phone: "",
    email: "",
    location: "",
    urgency: "Normal",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.bloodGroup || !formData.quantity || !formData.phone || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await addBloodRequest(formData, token); // backend expects 'quantity'
      console.log("Blood request submitted:", response);

      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        bloodGroup: "",
        quantity: "",
        phone: "",
        email: "",
        location: "",
        urgency: "Normal",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting blood request:", error);
      alert("Failed to submit blood request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Request Blood</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Fill the form below to request blood. We will notify eligible donors in your area.
        </p>
      </section>

      {/* Form + Image Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full lg:w-1/2">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold shadow-sm">
              ✅ Blood request submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex items-center gap-2">
              <FaUser className="text-red-600" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name*"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
            </div>

            {/* Blood Group & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaTint className="text-red-600" />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="">Select Blood Group*</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="quantity" // ✅ changed
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="Units Needed*"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaPhone className="text-red-600" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone*"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-red-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location*"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
            </div>

            {/* Urgency */}
            <div>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Additional Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Additional Message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />

            <Button text="Submit Request" type="submit" variant="primary" />
          </form>
        </div>

        <div className="hidden lg:block w-1/2">
          <img
            src={ReciveImage}
            alt="Donate Blood"
            className="w-full rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
