import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../Images/Hero.png"; // Replace with your actual image path
import { motion } from "framer-motion";
import Button from "./Button"; // Import your reusable Button component

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-r from-red-800 to-white-700 py-28 overflow-hidden">
      
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-4">
        
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-snug">
            Get Help in Emergencies <span className="text-yellow-300">Instantly</span>
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-md mx-auto md:mx-0">
            Join our <span className="font-semibold">Emergency Request System</span>. Request urgent help or volunteer to assist in emergencies.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="rounded overflow-hidden w-120 h-80 shadow-2xl border-8 border-white transform hover:scale-105 hover:rotate-3 transition-all duration-700">
            <img 
              src={HeroImage} 
              alt="Emergency Help" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
