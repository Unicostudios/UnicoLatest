"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { 
  IoArrowForwardCircleOutline, 
  IoVideocamOutline, 
  IoColorPaletteOutline, 
  IoStarOutline,
  IoHeartOutline,
  IoRestaurantOutline,
  IoLogoInstagram
} from "react-icons/io5";

export default function CreativeMarketingPage() {
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
    formData.append("Message", `[Creative Reels LP - ${businessType}] ${message}`);

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

  const scrollToForm = () => {
    document.getElementById("lead-form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0f0c1b] min-h-screen text-white font-montserrat-regular selection:bg-[#ff3b83] selection:text-white overflow-x-hidden">
      <NavbarWrapper theme="dark" />
      
      {/* 1. HERO SECTION (INSTAGRAM/VIBRANT AESTHETIC) */}
      <section className="relative pt-32 pb-24 px-6 sm:px-10 overflow-hidden min-h-[90vh] flex items-center justify-center text-center">
        {/* Dynamic Vibrant Gradients */}
        <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-[#ff3b83] opacity-30 blur-[150px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-[#ff8c00] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#ff3b83]/40 bg-[#ff3b83]/10 text-[#ff8eb9] text-xs sm:text-sm font-bold mb-8 tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(255,59,131,0.2)]">
            <IoLogoInstagram className="text-lg" /> Bengaluru's Top Creative Studio
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight">
            Stop Scrolling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ff3b83] to-[#9b2cff]">
              Start Trending.
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We produce viral <strong>Reels</strong>, stunning <strong>Design</strong>, and highly-targeted <strong>Influencer Campaigns</strong> exclusively for Bengaluru's cafes, restaurants, and premium brands.
          </p>
          
          <button onClick={scrollToForm} className="w-full sm:w-auto bg-gradient-to-r from-[#ff8c00] via-[#ff3b83] to-[#9b2cff] hover:opacity-90 transition-opacity px-12 py-5 rounded-full font-bold flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,59,131,0.5)] text-lg text-white">
            <span>Make Me Viral</span>
            <IoArrowForwardCircleOutline className="text-3xl" />
          </button>
        </div>
      </section>

      {/* 2. THE FOOD & LIFESTYLE FOCUS */}
      <section className="py-24 px-6 sm:px-10 bg-[#161224] border-y border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-tr from-[#ff3b83]/20 to-[#9b2cff]/20 p-6 rounded-[2rem] border border-[#ff3b83]/30 aspect-square flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-sm transform -rotate-3 hover:rotate-0 transition-transform">
                <IoRestaurantOutline className="text-5xl text-[#ff3b83] mb-3" />
                <h3 className="font-bold text-xl mb-1">Cafes & Dining</h3>
                <p className="text-xs text-neutral-400">Aesthetic food videography</p>
              </div>
              <div className="bg-gradient-to-tr from-[#ff8c00]/20 to-[#ff3b83]/20 p-6 rounded-[2rem] border border-[#ff8c00]/30 aspect-square flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-sm transform translate-y-8 rotate-3 hover:rotate-0 transition-transform">
                <IoStarOutline className="text-5xl text-[#ff8c00] mb-3" />
                <h3 className="font-bold text-xl mb-1">D2C Brands</h3>
                <p className="text-xs text-neutral-400">Product shoots & styling</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">
              We understand <br/> <span className="text-[#ff3b83]">Visual Appetite.</span>
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              In Bangalore, if your restaurant or brand doesn't look incredible on Instagram, you don't exist. People eat and shop with their eyes first.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed">
              We specialize in creating visual content that makes people stop their scroll, share with their friends, and immediately book a table or make a purchase.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES (THE CREATIVE TRIFECTA) */}
      <section className="py-24 px-6 sm:px-10 bg-[#0f0c1b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6">The Creative Trifecta</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Everything you need to dominate social media and build an irresistible brand identity.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Reel Shoots */}
            <div className="bg-[#161224] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-[#ff3b83]/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3b83] opacity-10 blur-[40px] rounded-full group-hover:opacity-30 transition-opacity" />
              <IoVideocamOutline className="text-5xl text-[#ff3b83] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 relative z-10">Cinematic Reel Shoots</h3>
              <p className="text-neutral-400 leading-relaxed relative z-10 mb-6">
                Professional 4K videography using cinema-grade cameras, dynamic lighting, and trending audio formats. We don't just shoot; we direct the vibe.
              </p>
              <ul className="space-y-2 text-sm text-neutral-300 relative z-10">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff3b83]" /> Food Pours & Action Shots</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff3b83]" /> Transitions & Trend Matching</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff3b83]" /> Color Grading & Sound Design</li>
              </ul>
            </div>

            {/* Influencer Marketing */}
            <div className="bg-[#161224] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-[#9b2cff]/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9b2cff] opacity-10 blur-[40px] rounded-full group-hover:opacity-30 transition-opacity" />
              <IoHeartOutline className="text-5xl text-[#9b2cff] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 relative z-10">Influencer Marketing</h3>
              <p className="text-neutral-400 leading-relaxed relative z-10 mb-6">
                We have direct relationships with Bengaluru's top food bloggers, lifestyle creators, and micro-influencers. We handle the outreach, negotiation, and execution.
              </p>
              <ul className="space-y-2 text-sm text-neutral-300 relative z-10">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#9b2cff]" /> Creator Shortlisting & Vetting</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#9b2cff]" /> Campaign Brief & Management</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#9b2cff]" /> Guaranteed Reach & Footfall</li>
              </ul>
            </div>

            {/* Design & Branding */}
            <div className="bg-[#161224] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-[#ff8c00]/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff8c00] opacity-10 blur-[40px] rounded-full group-hover:opacity-30 transition-opacity" />
              <IoColorPaletteOutline className="text-5xl text-[#ff8c00] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 relative z-10">High-End Design</h3>
              <p className="text-neutral-400 leading-relaxed relative z-10 mb-6">
                Your social media grid and physical menus need to scream luxury. Our graphic designers craft bespoke visual identities that command premium pricing.
              </p>
              <ul className="space-y-2 text-sm text-neutral-300 relative z-10">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" /> Social Media Grid Aesthetics</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" /> Menu & Print Design</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" /> Complete Brand Identity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROOF OF WORK / STATS */}
      <section className="py-24 px-6 sm:px-10 bg-gradient-to-br from-[#161224] to-[#0f0c1b] border-y border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-12">Numbers That Speak</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6">
              <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ff8c00] to-[#ff3b83] mb-2">50+</p>
              <p className="text-neutral-400 text-sm font-bold uppercase tracking-wider">Shoots Delivered</p>
            </div>
            <div className="p-6">
              <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ff3b83] to-[#9b2cff] mb-2">5M+</p>
              <p className="text-neutral-400 text-sm font-bold uppercase tracking-wider">Reel Views</p>
            </div>
            <div className="p-6">
              <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#9b2cff] to-[#00f0ff] mb-2">120+</p>
              <p className="text-neutral-400 text-sm font-bold uppercase tracking-wider">Influencers</p>
            </div>
            <div className="p-6">
              <p className="text-4xl sm:text-5xl font-black text-white mb-2">100%</p>
              <p className="text-neutral-400 text-sm font-bold uppercase tracking-wider">Vibe Matched</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM (LEAD GEN) */}
      <section id="lead-form" className="py-24 px-6 sm:px-10 bg-[#0f0c1b] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#ff3b83] opacity-10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="flex-1 text-white">
            <h2 className="text-4xl sm:text-6xl font-black leading-tight mb-6">
              Let's create <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff3b83]">Visual Magic.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
              Whether you need a one-off viral reel shoot, a complete menu redesign, or a full-scale influencer launch campaign in Bangalore, we are ready.
            </p>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 inline-block backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-2">Skip the form?</p>
              <a href="https://wa.me/918147057109" className="text-white hover:text-[#ff3b83] transition-colors flex items-center gap-3 font-bold text-lg">
                <IoLogoInstagram className="text-[#ff3b83] text-3xl" /> DM us or WhatsApp: +91 81470 57109
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-[2.5rem] w-full mx-auto p-8 sm:p-10 bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(255,59,131,0.1)] relative overflow-hidden backdrop-blur-xl">
              <p className="text-white text-2xl font-bold mb-8">Book a Creative Session</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-2xl placeholder:text-neutral-600 focus:border-[#ff3b83] focus:ring-1 focus:ring-[#ff3b83] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  placeholder="Phone No."
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-2xl placeholder:text-neutral-600 focus:border-[#ff3b83] focus:ring-1 focus:ring-[#ff3b83] transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  required
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-2xl placeholder:text-neutral-600 focus:border-[#ff3b83] focus:ring-1 focus:ring-[#ff3b83] transition-all appearance-none"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                >
                  <option value="" disabled>What kind of business?</option>
                  <option value="Cafe / Coffee Shop">Cafe / Coffee Shop</option>
                  <option value="Fine Dining / Restaurant">Fine Dining / Restaurant</option>
                  <option value="Cloud Kitchen">Cloud Kitchen</option>
                  <option value="D2C Product Brand">D2C Product Brand</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  required
                  placeholder="What do you need? (e.g. 4 Reel shoots, Influencer marketing, Menu design...)"
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-2xl placeholder:text-neutral-600 focus:border-[#ff3b83] focus:ring-1 focus:ring-[#ff3b83] transition-all resize-none"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#ff8c00] via-[#ff3b83] to-[#9b2cff] hover:opacity-90 transition-opacity text-white mt-2 w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg"
                >
                  <span>Submit Inquiry</span>
                  <IoArrowForwardCircleOutline className="text-2xl" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer theme="dark" />
    </div>
  );
}
