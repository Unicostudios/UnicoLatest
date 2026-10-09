"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { IoArrowForwardCircleOutline, IoCodeSlash, IoPhonePortraitOutline, IoRocketOutline, IoCheckmarkCircle } from "react-icons/io5";

export default function BengaluruDevLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = "https://script.google.com/macros/s/AKfycbwbd_NSDKHZYN70TsQwDD3uzQYaiHy1CVlTKEfBSqieD347NnV6jUw4iNVbj9uFRC1vZQ/exec";
    
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Message", `[Bengaluru Dev LP - ${projectType}] ${message}`);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setName("");
        setPhone("");
        setProjectType("");
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#5F14E0] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#5F14E0]/30 bg-[#5F14E0]/10 text-[#a87ffb] text-sm font-semibold mb-6 tracking-wide">
            💻 TOP-RATED DEVELOPMENT STUDIO IN BENGALURU
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-montserrat-medium leading-tight mb-8">
            Build World-Class <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F14E0] to-[#b785f5]">
              Web & Mobile Apps
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            From highly scalable SaaS platforms to gorgeous iOS and Android applications. Unico Studios is the technical partner of choice for ambitious founders and enterprises across Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToForm} className="w-full sm:w-auto bg-[#5F14E0] hover:bg-[#7228f4] transition-all px-8 py-4 rounded-full font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(95,20,224,0.4)]">
              <span>Discuss Your Project</span>
              <IoArrowForwardCircleOutline className="text-2xl" />
            </button>
            <a href="#work" className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-700 hover:border-neutral-500 transition-all font-montserrat-medium text-center">
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE BUILD (SERVICES) */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-4">What We Build</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Future-proof engineering combined with premium design aesthetics. We don't just write code; we build products that users love.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoCodeSlash className="text-4xl text-[#5F14E0] mb-4" />,
                title: "Custom Web Applications",
                desc: "High-performance, scalable web apps built with Next.js, React, and Node.js. Perfect for complex dashboards, marketplaces, and internal tools."
              },
              {
                icon: <IoPhonePortraitOutline className="text-4xl text-[#5F14E0] mb-4" />,
                title: "iOS & Android Apps",
                desc: "Native and cross-platform mobile experiences that feel smooth, fast, and premium. We help you dominate the App Store and Google Play."
              },
              {
                icon: <IoRocketOutline className="text-4xl text-[#5F14E0] mb-4" />,
                title: "SaaS Product Development",
                desc: "End-to-end SaaS development from MVP to scaling. We handle architecture, database design, API integrations, and subscriptions."
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
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-16 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Case Study 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-[#141414] border border-neutral-800 p-8 sm:p-10 flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F14E0] opacity-10 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <span className="text-[#a87ffb] text-sm font-bold tracking-wider uppercase mb-2 block">FinTech SaaS Dashboard</span>
                <h3 className="text-3xl font-bold mb-4">Scalable Web Platform</h3>
                <p className="text-neutral-400 mb-6">Built a high-frequency trading analytics dashboard handling real-time WebSockets and millions of data points smoothly using Next.js and Tailwind.</p>
              </div>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> Next.js & React</li>
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> Real-time Data Visualization</li>
              </ul>
            </div>
            
            {/* Case Study 2 */}
            <div className="group relative overflow-hidden rounded-3xl bg-[#141414] border border-neutral-800 p-8 sm:p-10 flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F14E0] opacity-10 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <span className="text-[#a87ffb] text-sm font-bold tracking-wider uppercase mb-2 block">Healthcare Booking App</span>
                <h3 className="text-3xl font-bold mb-4">Mobile App (iOS & Android)</h3>
                <p className="text-neutral-400 mb-6">Designed and engineered a cross-platform mobile app for a major Bangalore hospital chain, processing over 10,000 daily appointment bookings securely.</p>
              </div>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> Cross-Platform Mobile</li>
                <li className="flex items-center gap-2 text-sm text-neutral-300"><IoCheckmarkCircle className="text-[#5F14E0]" /> HIPAA Compliant Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK (PROCESS) */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-4">How We Engineer</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">We don't outsource. Your project is built entirely in-house by our top-tier engineering team in Bengaluru.</p>
          </div>
          
          <div className="space-y-12">
            {[
              { num: "01", title: "Discovery & Architecture", desc: "We map out your product's user journeys, choose the right technology stack (React, Node, etc.), and design a scalable system architecture." },
              { num: "02", title: "UI/UX & Prototyping", desc: "Before we write a single line of code, our award-winning designers create a pixel-perfect, interactive prototype of your application." },
              { num: "03", title: "Agile Development & QA", desc: "We code in weekly sprints, giving you continuous access to staging environments. Rigorous automated and manual testing ensures a bug-free launch." }
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
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-16 text-center">Trusted by Tech Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Karthik R.", role: "CEO, SaaS Startup in HSR Layout", text: "Unico Studios built our MVP in half the time we expected. The code quality is immaculate, and the app is lightning fast." },
              { name: "Priya S.", role: "Founder, E-commerce Brand", text: "They completely revamped our custom web app. We saw a 40% reduction in load times and a massive boost in conversion rates." },
              { name: "Arjun M.", role: "CTO, Logistics Tech", text: "Finding reliable developers in Bangalore is hard. Unico Studios proved to be the exception. Incredible communication and execution." }
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
              Let's Build <br/> Something Great.
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Whether you need a complex web application, a scalable SaaS product, or a beautiful mobile app, our Bangalore engineering team is ready to deliver.
            </p>
            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 inline-block">
              <p className="font-bold mb-1">Direct Contact</p>
              <p className="text-neutral-400 mb-4">Want to skip the form?</p>
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
                Discuss Your Project
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
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="" disabled>Select Project Type</option>
                  <option value="Custom Web Application">Custom Web Application</option>
                  <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                  <option value="SaaS Platform MVP">SaaS Platform MVP</option>
                  <option value="E-commerce Platform">E-commerce Platform</option>
                  <option value="UI/UX Design Only">UI/UX Design Only</option>
                </select>
                <textarea
                  required
                  placeholder="Briefly describe your requirements..."
                  className="border-neutral-700 bg-neutral-900 border w-full text-white text-sm sm:text-base outline-none py-3.5 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all resize-none"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#5F14E0] hover:bg-[#7228f4] transition-colors text-white mt-2 w-full py-4 rounded-xl font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(95,20,224,0.39)] hover:shadow-[0_6px_20px_rgba(95,20,224,0.23)]"
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
