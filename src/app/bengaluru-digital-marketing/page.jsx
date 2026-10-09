"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export default function BengaluruLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = "https://script.google.com/macros/s/AKfycbwbd_NSDKHZYN70TsQwDD3uzQYaiHy1CVlTKEfBSqieD347NnV6jUw4iNVbj9uFRC1vZQ/exec";
    
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Message", `[Bengaluru LP - ${businessType}] ${message}`);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setName("");
        setPhone("");
        setBusinessType("");
        setMessage("");
        toast.success("Sent Successfully");
      } else {
        toast.error("Failed to send!");
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error!", error.message);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="bg-black min-h-screen font-montserrat-regular selection:bg-neutral-800">
      <NavbarWrapper theme="dark" />
      
      <main className="pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat-medium leading-tight mb-6">
            Grow Your Business in <span className="text-[#5F14E0]">Bengaluru</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Whether you run a bustling restaurant in Indiranagar, a clinic in Koramangala, or a growing startup in HSR Layout, we help you dominate local searches and get more footfall and leads through targeted digital marketing.
          </p>
          <ul className="text-gray-400 space-y-4 mb-10 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-[#5F14E0] font-bold">✓</span> Local SEO & Google Maps Ranking
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#5F14E0] font-bold">✓</span> Lead Generation Ads (Meta & Google)
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#5F14E0] font-bold">✓</span> High-Conversion Websites
            </li>
          </ul>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 w-full">
          <div className="rounded-3xl w-full mx-auto p-8 sm:p-10 bg-[#191919] border border-neutral-800 shadow-2xl">
            <p className="text-white text-xl sm:text-2xl font-montserrat-medium mb-2">
              Get Your Free Growth Strategy
            </p>
            <p className="text-gray-400 text-sm mb-8">
              We respond within 24 hours with a custom plan.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 relative">
              <input
                required
                type="text"
                placeholder="Your Name"
                className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Phone No."
                className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] transition-colors"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <select
                required
                className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] transition-colors appearance-none"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="" disabled>Select Business Type</option>
                <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                <option value="Clinic / Hospital">Clinic / Hospital</option>
                <option value="Retail Store">Retail Store</option>
                <option value="Startup / Tech">Startup / Tech</option>
                <option value="Other Small Business">Other Small Business</option>
              </select>
              <textarea
                required
                placeholder="Tell us about your business goals..."
                className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] transition-colors resize-none"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#5F14E0] hover:bg-[#7228f4] transition-colors text-white mt-2 w-full py-4 rounded-xl font-montserrat-medium flex items-center justify-center gap-3"
              >
                <span>Get Started Now</span>
                <IoArrowForwardCircleOutline className="text-2xl" />
              </button>
            </form>
          </div>
        </div>
        
      </main>
      
      <Footer theme="dark" />
    </div>
  );
}
