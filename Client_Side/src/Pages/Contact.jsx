import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import FormInput from "../Components/FormInput";
import { AuthContext } from "../context/AuthContext";
import { addEvent } from "../services/eventService";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Contact() {
  const { user } = useContext(AuthContext); // get logged-in user for token
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1️⃣ Send contact message to backend
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message");

      // 2️⃣ Optional: Log this as an event (if admin token exists)
      if (user?.token) {
        const eventData = {
          title: `New Contact Form: ${formData.subject}`,
          description: `${formData.name} (${formData.email}) says: ${formData.message}`,
          date: new Date().toISOString(),
        };
        await addEvent(eventData, user.token);
      }

      setSuccessMsg("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMsg(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to our team for support.
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row max-w-full px-4 py-16 gap-10 w-full">
        {/* Contact Form */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              placeholder="Your Name"
              onChange={handleChange}
              required
            />
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              required
            />
            <FormInput
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="Subject"
              onChange={handleChange}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="5"
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <Button
              text={loading ? "Sending..." : "Send Message"}
              variant="primary"
              type="submit"
              disabled={loading}
            />

            {/* Feedback Messages */}
            {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
          </form>
        </div>

        {/* Contact Info & Google Map */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-red-100 rounded-xl shadow-lg p-6 text-red-700">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-2"><strong>Address:</strong> Sanepa-02, Lalitpur, Nepal</p>
            <p className="mb-2"><strong>US Address:</strong> 12723 GORMAN CIR BOYDS, MD 20841</p>
            <p className="mb-2"><strong>Phone:</strong> +977 9801230045</p>
            <p className="mb-2"><strong>Email:</strong> team@blooddonation.com</p>
            <p className="mt-2">
              We are here to help you with emergency requests, volunteering, or any general inquiries.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5207488493865!2d85.32244187503677!3d27.667999232757026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a2b7f99b5%3A0x35e76c12a8c54e59!2sSanepa%2C%20Lalitpur!5e0!3m2!1sen!2snp!4v1694964123456!5m2!1sen!2snp"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
