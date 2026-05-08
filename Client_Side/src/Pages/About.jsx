import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Button from "../Components/Button"; // Import Button
import { FaHeartbeat, FaHandsHelping, FaUsers } from "react-icons/fa";
import HeroImage from "../Images/Detail.png"; // Add a relevant hero image

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative bg-red-300 py-16 flex flex-col md:flex-row items-center w-full px-4 gap-8">
        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            About Emergency Request System
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-md mx-auto md:mx-0">
            Connecting people in urgent need with volunteers and emergency assistance instantly.
          </p>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={HeroImage}
            alt="Emergency Help"
            className="w-4/5 md:w-full rounded-tl-full rounded-br-full shadow-2xl border-4 border-white"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to save lives by providing a smart, easy-to-use platform for requesting and providing emergency help.
          </p>
          <p className="text-gray-700">
            We aim to reduce response time during emergencies and create a connected community of volunteers and recipients.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <FaHeartbeat className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Emergency Requests</h3>
              <p className="text-gray-600">
                Instantly request emergency help and track responses in real-time.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <FaHandsHelping className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Volunteer Support</h3>
              <p className="text-gray-600">
                Volunteers can assist in emergencies, helping save lives and provide immediate aid.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <FaUsers className="text-red-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
              <p className="text-gray-600">
                Build a connected community where people support each other in times of urgent need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Our Team</h2>
          <p className="text-gray-700 mb-4">
            A dedicated team of developers and volunteers working to make emergency assistance accessible to everyone.
          </p>
          <p className="text-gray-700">
            We combine technology and compassion to create a platform that saves lives and supports communities.
          </p>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-red-300 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Us in Saving Lives
        </h2>
        <p className="mb-6 text-lg md:text-xl max-w-2xl mx-auto">
          Register as a volunteer or request help now and become part of our life-saving community.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            text="Request Help"
            variant="primary"
            onClick={() => window.location.href = "/register"}
            className="hover:scale-105 transform transition-transform duration-300"
          />
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
