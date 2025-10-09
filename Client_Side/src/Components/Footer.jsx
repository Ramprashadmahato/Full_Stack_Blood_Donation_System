import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "../Images/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* Logo & Description */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo"  className="w-40 h-40 md:w-20 md:h-20 object-contain rounded-full" />
            <h5 className="font-bold text-lg">Emergency Request System</h5>
          </div>
          <p className="text-sm">
            We are committed to connecting emergency responders and those in need efficiently,
            ensuring timely assistance and promoting community safety.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold mb-4">Contact Info</h2>
          <p className="text-sm">Address: Sanepa-02, Lalitpur, Nepal</p>
          <p className="text-sm">US Address: 12723 GORMAN CIR BOYDS, MD 20841</p>
          <p className="text-sm">Phone: +977 9801230045</p>
          <p className="text-sm">Email: team@emergencyrequest.com</p>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-semibold mb-4">Resources</h2>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:underline">Emergency Guidelines</a></li>
            <li><a href="/" className="hover:underline">Response Teams</a></li>
            <li><a href="/" className="hover:underline">Request Help</a></li>
            <li><a href="/report" className="hover:underline">Reports</a></li>
            <li><a href="/" className="hover:underline">Videos</a></li>
            <li><a href="/" className="hover:underline">Media Kit</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h2 className="font-semibold mb-4">Newsletter</h2>
          <p className="text-sm mb-3">Subscribe to get the latest updates about emergency requests.</p>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="px-3 py-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
              ➤
            </button>
          </div>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-200 text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} Emergency Request System | Final Year Project
      </div>
    </footer>
  );
}
