import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Button from "../components/Button";
import { Link } from "react-router-dom";

// Example feature images
import RequestHelpImg from "../Images/RequestHelpImg.png";
import VolunteerImg from "../Images/Image.png";
import TrackImg from "../Images/TrackImg.png";
import Bg from "../Images/Bg.png";
import Background from "../Images/Background.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Features Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-red-600 mb-14">
            How Our System Helps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition duration-500 flex flex-col items-center">
              <img src={RequestHelpImg} alt="Request Help" className="w-24 h-24 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-red-600">Request Help</h3>
              <p className="text-gray-700 mb-4">
                Quickly request emergency assistance with real-time tracking and notifications.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition duration-500 flex flex-col items-center">
              <img src={VolunteerImg} alt="Volunteer" className="w-24 h-24 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-red-600">Volunteer</h3>
              <p className="text-gray-700 mb-4">
                Sign up as a volunteer to help people in emergency situations.
              </p>
              <Link to="/contact">
                <Button text="Join Us" variant="secondary" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition duration-500 flex flex-col items-center">
              <img src={TrackImg} alt="Track Requests" className="w-24 h-24 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-red-600">Track Requests</h3>
              <p className="text-gray-700 mb-4">
                Monitor the status of your emergency requests and see matched volunteers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-red-600 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Need Help or Want to Volunteer?
          </h2>
          <p className="mb-8 text-lg md:text-xl">
            Our Emergency Request System connects people in need with volunteers instantly.
          </p>
          <Link to="/register">
            <Button text="Get Started" variant="primary" />
          </Link>
        </div>

        {/* Optional background images/shapes */}
        <img src={Background} alt="" className="absolute top-0 left-0 w-48 h-48 opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <img src={Bg}  alt="" className="absolute bottom-0 right-0 w-72 h-72 opacity-20 translate-x-1/4 translate-y-1/4" />
      </section>

      <Footer />
    </div>
  );
}
