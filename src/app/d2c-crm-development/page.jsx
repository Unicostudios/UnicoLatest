"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { IoArrowForwardCircleOutline, IoLogoWhatsapp, IoAnalyticsOutline, IoCubeOutline, IoMailOutline } from "react-icons/io5";

export default function D2cCrmLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = "https://script.google.com/macros/s/AKfycbwbd_NSDKHZYN70TsQwDD3uzQYaiHy1CVlTKEfBSqieD347NnV6jUw4iNVbj9uFRC1vZQ/exec";
    
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Message", `[D2C CRM LP - ${companyName}] ${message}`);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setName("");
        setPhone("");
        setCompanyName("");
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
    <div className="bg-[#050505] min-h-screen text-white font-montserrat-regular selection:bg-[#5F14E0] selection:text-white">
      <NavbarWrapper theme="dark" />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 sm:px-10 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[#5F14E0] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-block px-5 py-2 rounded-full border border-[#5F14E0]/40 bg-[#5F14E0]/10 text-[#c2a3ff] text-xs sm:text-sm font-bold mb-8 tracking-widest uppercase">
            Built Exclusively for Scaling D2C Brands
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-montserrat-medium leading-tight mb-8 max-w-4xl">
            The Ultimate Custom CRM for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F14E0] to-[#b785f5]">Direct-to-Consumer</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop juggling between Shopify, Ads Managers, and Google Sheets. Unico Studios builds bespoke, ultra-fast CRMs with real-time inventory sync, ad revenue calculation, and automated WhatsApp reminders.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 w-full sm:w-auto">
            <button onClick={scrollToForm} className="w-full sm:w-auto bg-[#5F14E0] hover:bg-[#7228f4] transition-all px-10 py-5 rounded-full font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(95,20,224,0.4)] text-lg">
              <span>Book a Demo</span>
              <IoArrowForwardCircleOutline className="text-3xl" />
            </button>
          </div>

          {/* CRM Dashboard Mockup */}
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform perspective-[1000px] rotate-x-[2deg]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10 h-32 bottom-0 top-auto" />
            <img 
              src="/d2c-crm-dashboard.jpg" 
              alt="Unico Custom D2C CRM Dashboard Interface" 
              className="w-full h-auto object-cover relative z-0"
            />
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES */}
      <section className="py-24 px-6 sm:px-10 relative z-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6">Built for Operations & Growth</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">We engineer custom software that solves the exact operational bottlenecks D2C brands face every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <IoCubeOutline className="text-4xl text-[#5F14E0] mb-5" />,
                title: "Live Inventory & Stock",
                desc: "Real-time sync with your warehouses. Manage SKUs perfectly and never oversell a product again."
              },
              {
                icon: <IoAnalyticsOutline className="text-4xl text-[#5F14E0] mb-5" />,
                title: "Ad Revenue Sync",
                desc: "Custom API integrations with Meta and Google Ads to calculate real-time ROAS, spend, and net revenue."
              },
              {
                icon: <IoLogoWhatsapp className="text-4xl text-[#5F14E0] mb-5" />,
                title: "WhatsApp Automations",
                desc: "Send instant WhatsApp reminders to your team for low stock SKUs or daily revenue reports automatically."
              },
              {
                icon: <IoMailOutline className="text-4xl text-[#5F14E0] mb-5" />,
                title: "Email Notifications",
                desc: "Automated email alerts for delayed shipments, low inventory warnings, and end-of-day sales summaries."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#121212] border border-neutral-800 p-8 rounded-3xl hover:border-[#5F14E0]/50 transition-all group hover:-translate-y-2">
                <div className="group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREMIUM UI AESTHETICS */}
      <section className="py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">
              Enterprise Power. <br/> <span className="text-[#a87ffb]">Startup Aesthetics.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Most CRMs look like they were built in 2005. At Unico Studios, we believe internal tools should be beautiful, fast, and a joy to use. 
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-neutral-300">
                <div className="w-2 h-2 rounded-full bg-[#5F14E0]" /> Glassmorphism & Dark Mode UI
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <div className="w-2 h-2 rounded-full bg-[#5F14E0]" /> Lightning Fast Navigation (Next.js)
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <div className="w-2 h-2 rounded-full bg-[#5F14E0]" /> Custom Brand Colors & Theming
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full">
            {/* Another display of the CRM */}
            <div className="rounded-2xl p-4 bg-gradient-to-br from-[#141414] to-black border border-neutral-800 shadow-2xl relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5F14E0] to-[#b785f5] rounded-2xl blur opacity-20" />
              <img 
                src="/d2c-crm-dashboard.jpg" 
                alt="Unico CRM Interface Detail" 
                className="w-full h-auto rounded-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT FORM */}
      <section id="lead-form" className="py-24 px-6 sm:px-10 bg-[#5F14E0]/5 border-t border-[#5F14E0]/20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Copy */}
          <div className="flex-1 text-white">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium leading-tight mb-6">
              Ready to Upgrade <br/> Your Operations?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Let's discuss building a bespoke CRM tailored exactly to your D2C brand's inventory, advertising, and team workflow needs.
            </p>
            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 inline-block">
              <p className="font-bold mb-1">Talk to our Architects</p>
              <a href="https://wa.me/918147057109" className="text-[#a87ffb] hover:text-white transition-colors flex items-center gap-2 mt-3">
                <IoLogoWhatsapp className="text-2xl" /> +91 81470 57109
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-3xl w-full mx-auto p-8 sm:p-10 bg-[#121212] border border-neutral-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F14E0] opacity-20 blur-[50px] rounded-full" />
              <p className="text-white text-xl sm:text-2xl font-montserrat-medium mb-6 relative z-10">
                Request a Custom CRM Quote
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 relative z-10">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  placeholder="D2C Brand Name"
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  placeholder="Phone No."
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  required
                  placeholder="What are your main operational bottlenecks? (e.g. inventory tracking, ROAS calculation...)"
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all resize-none"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#5F14E0] hover:bg-[#7228f4] transition-colors text-white mt-2 w-full py-4 rounded-xl font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(95,20,224,0.39)] hover:shadow-[0_6px_20px_rgba(95,20,224,0.23)] text-lg"
                >
                  <span>Get Started</span>
                  <IoArrowForwardCircleOutline className="text-3xl" />
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
