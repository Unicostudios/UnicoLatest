"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { IoArrowForwardCircleOutline, IoCheckmarkCircle, IoTrendingUp, IoPeople, IoGlobe } from "react-icons/io5";

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

  const scrollToForm = () => {
    document.getElementById("lead-form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black min-h-screen text-white font-montserrat-regular selection:bg-[#5F14E0] selection:text-white">
      <NavbarWrapper theme="dark" />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 sm:px-10 overflow-hidden">
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#5F14E0] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#5F14E0]/30 bg-[#5F14E0]/10 text-[#a87ffb] text-sm font-semibold mb-6 tracking-wide">
            🏆 BENGALURU'S TOP GROWTH AGENCY
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-montserrat-medium leading-tight mb-8">
            Digital Marketing That Drives <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F14E0] to-[#b785f5]">
              Real Customers To Your Door
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            We help Bangalore's restaurants, clinics, and startups dominate local search, launch high-converting ad campaigns, and build stunning websites. Stop losing leads to your competitors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToForm} className="w-full sm:w-auto bg-[#5F14E0] hover:bg-[#7228f4] transition-all px-8 py-4 rounded-full font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(95,20,224,0.4)]">
              <span>Get Your Free Strategy</span>
              <IoArrowForwardCircleOutline className="text-2xl" />
            </button>
            <a href="#work" className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-700 hover:border-neutral-500 transition-all font-montserrat-medium text-center">
              See Our Work
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO (SERVICES) */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-4">What We Do</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">End-to-end digital solutions designed to increase your footfall, revenue, and local visibility in Bengaluru.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoGlobe className="text-4xl text-[#5F14E0] mb-4" />,
                title: "Local SEO & GMB Optimization",
                desc: "We rank your clinic or restaurant #1 on Google Maps for high-intent searches like 'best near me' in Indiranagar, Koramangala, and HSR Layout."
              },
              {
                icon: <IoPeople className="text-4xl text-[#5F14E0] mb-4" />,
                title: "Targeted Lead Generation",
                desc: "Data-driven Meta and Google Ads campaigns that capture high-quality leads for SaaS startups and local businesses with maximum ROI."
              },
              {
                icon: <IoTrendingUp className="text-4xl text-[#5F14E0] mb-4" />,
                title: "Conversion-Optimized Web Design",
                desc: "We build blazing-fast, aesthetic websites that turn visitors into paying customers. Complete with booking systems and analytics tracking."
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-[#141414] border border-neutral-800 p-8 rounded-3xl hover:border-[#5F14E0] transition-colors group">
                <div className="group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR WORK */}
      <section id="work" className="py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-16 text-center">Our Work & Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Case Study 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-[#141414] border border-neutral-800 p-8 sm:p-10 flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F14E0] opacity-10 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <span className="text-[#a87ffb] text-sm font-bold tracking-wider uppercase mb-2 block">Premium Dental Clinic (Koramangala)</span>
                <h3 className="text-3xl font-bold mb-4">300% Increase in Patient Bookings</h3>
                <p className="text-neutral-400 mb-6">Through hyper-local SEO and a revamped conversion-focused website, we helped a top clinic triple their monthly patient walk-ins within 90 days.</p>
              </div>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> Google Maps #1 Ranking</li>
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> UX/UI Redesign</li>
              </ul>
            </div>
            
            {/* Case Study 2 */}
            <div className="group relative overflow-hidden rounded-3xl bg-[#141414] border border-neutral-800 p-8 sm:p-10 flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F14E0] opacity-10 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <span className="text-[#a87ffb] text-sm font-bold tracking-wider uppercase mb-2 block">Cloud Kitchen (Indiranagar)</span>
                <h3 className="text-3xl font-bold mb-4">₹20L+ Revenue from Performance Ads</h3>
                <p className="text-neutral-400 mb-6">We deployed highly targeted Meta Ads targeting a 5km radius, paired with mouth-watering creatives, dropping their Customer Acquisition Cost by 45%.</p>
              </div>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> Meta Ads Management</li>
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> Creative Strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WE DO IT (PROCESS) */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-4">How We Do It</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">A transparent, data-backed approach to scaling your Bengaluru business.</p>
          </div>
          
          <div className="space-y-12">
            {[
              { num: "01", title: "Deep Dive Audit & Strategy", desc: "We analyze your local competitors, current website performance, and SEO gaps to create a foolproof roadmap tailored to the Bangalore market." },
              { num: "02", title: "Design & Infrastructure Setup", desc: "We optimize or rebuild your website for speed, aesthetics, and conversions. We set up analytics to track every single lead and footfall." },
              { num: "03", title: "Growth & Execution", desc: "We launch local SEO campaigns, scale your paid ads, and consistently optimize based on data to ensure your ROI keeps climbing month over month." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#5F14E0] to-black/20 shrink-0">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-16 text-center">What Bengaluru Founders Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul S.", role: "Founder, Tech Startup in HSR", text: "Unico Studios transformed our brand identity and overhauled our website. Our inbound leads doubled in just two months." },
              { name: "Dr. Anjali M.", role: "Clinic Owner, Koramangala", text: "Finally, an agency that understands local SEO! We went from page 4 to ranking #1 for 'best skin clinic near me' in Bangalore." },
              { name: "Vikram K.", role: "Restaurant Chain Owner", text: "Their performance marketing strategies are unmatched. The ROAS we are seeing on our weekend campaigns is phenomenal." }
            ].map((review, idx) => (
              <div key={idx} className="bg-[#141414] border border-neutral-800 p-8 rounded-3xl relative">
                <div className="text-[#5F14E0] text-5xl font-serif absolute top-4 left-6 opacity-30">"</div>
                <p className="text-gray-300 relative z-10 mt-6 mb-8 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-[#a87ffb]">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT FORM */}
      <section id="lead-form" className="py-24 px-6 sm:px-10 bg-[#5F14E0]/5 border-t border-[#5F14E0]/20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Copy */}
          <div className="flex-1 text-white">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium leading-tight mb-6">
              Ready to Dominate <br/> your Market?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Fill out the form below to get a free, no-obligation growth strategy and SEO audit for your business. We typically respond within 24 hours.
            </p>
            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 inline-block">
              <p className="font-bold mb-1">Direct Contact</p>
              <p className="text-neutral-400 mb-4">Prefer to talk directly?</p>
              <a href="https://wa.me/918147057109" className="text-[#a87ffb] hover:text-white transition-colors flex items-center gap-2">
                WhatsApp: +91 81470 57109
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-3xl w-full mx-auto p-8 sm:p-10 bg-[#141414] border border-neutral-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F14E0] opacity-20 blur-[50px] rounded-full" />
              <p className="text-white text-xl sm:text-2xl font-montserrat-medium mb-6 relative z-10">
                Request Your Growth Plan
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 relative z-10">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  placeholder="Phone No."
                  className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  required
                  className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all appearance-none"
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
                  className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all resize-none"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#5F14E0] hover:bg-[#7228f4] transition-colors text-white mt-2 w-full py-4 rounded-xl font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(95,20,224,0.39)] hover:shadow-[0_6px_20px_rgba(95,20,224,0.23)]"
                >
                  <span>Submit Request</span>
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
