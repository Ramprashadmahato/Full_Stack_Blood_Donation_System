import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I request emergency help?",
      answer:
        "You can request emergency help by navigating to the 'Request Help' page, filling out the form, and submitting it. Our volunteers will be notified instantly."
    },
    {
      question: "How can I become a volunteer?",
      answer:
        "To become a volunteer, go to the 'Volunteer' page, register your details, and you will be part of our emergency response community."
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, we take privacy seriously. Your data is securely stored and only used for emergency notifications and volunteer coordination."
    },
    {
      question: "Can I track the status of my request?",
      answer:
        "Yes, once your request is submitted, you can track its status via the 'Request Status' page in your dashboard."
    },
    {
      question: "Can I cancel my volunteer availability?",
      answer:
        "Yes, you can update or cancel your availability in your volunteer dashboard at any time."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Find answers to common questions about requesting help, volunteering, and using our Emergency Request System.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-red-600 mb-10 text-center">
          Your Questions Answered
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-red-600">{faq.question}</h3>
                <span className="text-red-600">
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-700 mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
