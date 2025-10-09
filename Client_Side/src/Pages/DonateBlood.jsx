import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTint } from "react-icons/fa";
import DonateImage from "../Images/Donate.png";
import { AuthContext } from "../context/AuthContext";
import { addDonor } from "../services/donorService";

export default function DonateBlood() {
  const { token } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    bloodgroup: "",
    phone: "",
    email: "",
    location: "",
    lastDonation: "",
    weight: "",
    diseases: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 
    setSubmitted(false);

    if (!token) {
      setMessage("❌ You must be logged in to submit!");
      return;
    }

    const donorData = {
      name: inputs.name.trim(),
      age: inputs.age ? Number(inputs.age) : null,
      bloodGroup: inputs.bloodgroup,
      phone: inputs.phone.trim(),
      email: inputs.email.trim(),
      location: inputs.location.trim(),
      lastDonation: inputs.lastDonation ? new Date(inputs.lastDonation) : null,
      weight: inputs.weight ? Number(inputs.weight) : null,
      diseases: inputs.diseases.trim() || "None",
    };

    if (!donorData.name || !donorData.age || !donorData.bloodGroup || !donorData.phone || !donorData.email || !donorData.location) {
      setMessage("❌ All required fields must be filled!");
      return;
    }

    try {
      const res = await addDonor(donorData, token);
      if (res && res._id) {
        setSubmitted(true);
        setMessage("✅ Donor registered successfully!");
        setInputs({
          name: "",
          age: "",
          bloodgroup: "",
          phone: "",
          email: "",
          location: "",
          lastDonation: "",
          weight: "",
          diseases: "",
        });
      } else {
        setMessage("❌ Failed to register donor: " + (res?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("DonateBlood error:", err);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Donate Blood</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Fill the form below to become a blood donor. Help save lives in your community.
        </p>
      </section>

      {/* Form + Image Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full lg:w-1/2">
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-center font-semibold shadow-sm ${submitted ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex items-center gap-2">
              <FaUser className="text-red-600" />
              <input type="text" name="name" value={inputs.name} onChange={handleChange} placeholder="Full Name*" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>

            {/* Age & Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="number" name="age" value={inputs.age} onChange={handleChange} placeholder="Age*" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
              <input type="number" name="weight" value={inputs.weight} onChange={handleChange} placeholder="Weight (kg)*" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>

            {/* Blood Group */}
            <div className="flex items-center gap-2">
              <FaTint className="text-red-600" />
              <select name="bloodgroup" value={inputs.bloodgroup} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none">
                <option value="">Select Blood Group*</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="tel" name="phone" value={inputs.phone} onChange={handleChange} placeholder="Phone*" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
              <input type="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Email*" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600" />
              <input type="text" name="location" value={inputs.location} onChange={handleChange} placeholder="Location*" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>

            {/* Last Donation & Diseases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" name="lastDonation" value={inputs.lastDonation} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
              <input type="text" name="diseases" value={inputs.diseases} onChange={handleChange} placeholder="Medical Conditions (if any)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-shadow shadow-lg">
              Register as Donor
            </button>
          </form>
        </div>

        <div className="hidden lg:block w-1/2">
          <img src={DonateImage} alt="Donate Blood" className="w-full rounded-3xl shadow-2xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
