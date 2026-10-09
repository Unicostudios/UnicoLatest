"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { 
  IoArrowForwardCircleOutline, 
  IoLogoWhatsapp, 
  IoAnalyticsOutline, 
  IoCubeOutline, 
  IoMailOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoChevronDownOutline
} from "react-icons/io5";

export default function D2cCrmLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-montserrat-regular selection:bg-[#5F14E0] selection:text-white">
      <NavbarWrapper theme="dark" />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 sm:px-10 overflow-hidden">
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

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-4">Why Standard CRMs Fail D2C Brands</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Off-the-shelf software isn't built for the chaotic, fast-paced nature of modern e-commerce.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#141414] border border-red-900/30 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-400">
                <IoAlertCircleOutline className="text-3xl" /> The Old Way
              </h3>
              <ul className="space-y-4 text-neutral-400">
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> Blind spots between ad spend and actual inventory levels resulting in wasted ROAS.</li>
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> Manual WhatsApp messages sent by support agents, taking hours of payroll.</li>
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> Juggling 5 different tools (Shopify, Meta Ads, Klaviyo, Excel, Shiprocket) just to get a daily summary.</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a103c] to-[#141414] border border-[#5F14E0]/30 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F14E0] opacity-20 blur-[50px] rounded-full" />
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#a87ffb] relative z-10">
                <IoCheckmarkCircleOutline className="text-3xl" /> The Unico Way
              </h3>
              <ul className="space-y-4 text-neutral-300 relative z-10">
                <li className="flex items-start gap-3"><span className="text-[#5F14E0] font-bold mt-1">✓</span> One centralized dashboard that talks directly to your ads, warehouse, and store.</li>
                <li className="flex items-start gap-3"><span className="text-[#5F14E0] font-bold mt-1">✓</span> Automated WhatsApp AI that handles NDRs, abandons, and support instantly.</li>
                <li className="flex items-start gap-3"><span className="text-[#5F14E0] font-bold mt-1">✓</span> Real-time Net Margin calculator—know exactly how much profit you made today.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES OVERVIEW */}
      <section className="py-24 px-6 sm:px-10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6">Built for Operations & Growth</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">We engineer custom software that solves the exact operational bottlenecks D2C brands face every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <IoCubeOutline />, title: "Live Inventory & Stock", desc: "Real-time sync with your warehouses. Manage SKUs perfectly." },
              { icon: <IoAnalyticsOutline />, title: "Ad Revenue Sync", desc: "API integrations with Meta/Google to calculate real ROAS." },
              { icon: <IoLogoWhatsapp />, title: "WhatsApp Automations", desc: "Instant reminders to your team for low stock SKUs." },
              { icon: <IoMailOutline />, title: "Email Notifications", desc: "Automated alerts for delayed shipments and daily sales." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#121212] border border-neutral-800 p-8 rounded-3xl hover:border-[#5F14E0]/50 transition-all group hover:-translate-y-2">
                <div className="text-4xl text-[#5F14E0] mb-5 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEEP DIVE: INVENTORY */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a] border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="w-16 h-16 bg-[#5F14E0]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#5F14E0]/30">
              <IoCubeOutline className="text-3xl text-[#a87ffb]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-montserrat-medium mb-6">Flawless Inventory <br/> & Supply Chain Sync</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              When a D2C brand scales, stockouts kill momentum. Our custom CRM acts as your central source of truth. It tracks multi-warehouse inventory, calculates average sell-through rates, and automatically triggers purchase orders when stock reaches critical levels.
            </p>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#5F14E0]" /> Multi-Location Warehouse Tracking</li>
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#5F14E0]" /> Automated Low-Stock Purchase Orders</li>
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#5F14E0]" /> SKU-level Profitability Analysis</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#141414] p-8 rounded-3xl border border-neutral-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-10 blur-[60px] rounded-full" />
             <div className="space-y-4 relative z-10">
               {/* Mock UI Element */}
               <div className="bg-black/50 p-4 rounded-xl border border-neutral-800 flex justify-between items-center">
                 <div>
                   <p className="font-bold">Classic Comfort Tee - Black (M)</p>
                   <p className="text-xs text-red-400 mt-1">Only 12 units left • Burn rate: 5/day</p>
                 </div>
                 <button className="px-4 py-2 bg-neutral-800 text-xs rounded-lg hover:bg-neutral-700 transition">Reorder</button>
               </div>
               <div className="bg-black/50 p-4 rounded-xl border border-neutral-800 flex justify-between items-center">
                 <div>
                   <p className="font-bold">Signature Perfume 50ml</p>
                   <p className="text-xs text-green-400 mt-1">450 units left • Burn rate: 20/day</p>
                 </div>
                 <button className="px-4 py-2 bg-neutral-800 text-xs rounded-lg text-neutral-500 cursor-not-allowed">Healthy</button>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. DEEP DIVE: AD REVENUE & ROAS */}
      <section className="py-24 px-6 sm:px-10 bg-[#050505] border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <div className="w-16 h-16 bg-[#5F14E0]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#5F14E0]/30">
              <IoAnalyticsOutline className="text-3xl text-[#a87ffb]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-montserrat-medium mb-6">True ROAS & Net Margin Calculation</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Shopify shows gross revenue. Meta shows a delayed ROAS. We pull data from your ad accounts, payment gateways, and shipping partners (like Shiprocket) to calculate your <strong>True Net Margin</strong> in real-time. Stop guessing if you are actually making money today.
            </p>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#5F14E0]" /> Meta, Google & TikTok Ads API Integration</li>
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#5F14E0]" /> Return/RTO Deduction Formulas</li>
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#5F14E0]" /> Real-time Net Profit Dashboard</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#141414] p-8 rounded-3xl border border-neutral-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 p-5 rounded-xl border border-neutral-800">
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Total Ad Spend</p>
                <p className="text-3xl font-montserrat-medium text-red-400">₹45,200</p>
                <p className="text-xs text-neutral-600 mt-2">Last 24 Hours</p>
              </div>
              <div className="bg-black/50 p-5 rounded-xl border border-neutral-800">
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Gross Revenue</p>
                <p className="text-3xl font-montserrat-medium text-green-400">₹1,82,400</p>
                <p className="text-xs text-neutral-600 mt-2">Last 24 Hours</p>
              </div>
              <div className="bg-black/50 p-5 rounded-xl border border-[#5F14E0]/50 col-span-2 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#5F14E0]/20 to-transparent" />
                <p className="text-[#a87ffb] text-xs font-bold uppercase tracking-wider mb-1">True Net Margin (Post RTO & COGS)</p>
                <p className="text-4xl font-montserrat-medium text-white">₹38,150</p>
                <p className="text-xs text-green-400 mt-2 font-bold">+12% vs Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DEEP DIVE: WHATSAPP */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a] border-t border-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#25D366]/30">
              <IoLogoWhatsapp className="text-3xl text-[#25D366]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-montserrat-medium mb-6">WhatsApp Automation Engine</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Our CRM connects directly to the WhatsApp Cloud API. We automate Non-Delivery Report (NDR) follow-ups, abandoned cart recovery, and VIP customer outreach. Internally, the CRM sends daily EOD reports directly to your founder WhatsApp group.
            </p>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#25D366]" /> Automated NDR & RTO Reduction</li>
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#25D366]" /> VIP Customer Win-Back Campaigns</li>
              <li className="flex items-center gap-2"><IoCheckmarkCircleOutline className="text-[#25D366]" /> Internal Daily Flash Reports for Founders</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#141414] p-8 rounded-3xl border border-neutral-800">
             <div className="bg-[#0b141a] rounded-2xl p-4 font-sans max-w-sm mx-auto border border-neutral-800">
               {/* Chat Mockup */}
               <div className="flex flex-col gap-3">
                 <div className="bg-[#202c33] text-white p-3 rounded-xl rounded-tl-sm self-start text-sm max-w-[85%]">
                   Hi Rahul! We noticed you left a Premium Leather Wallet in your cart. Complete your purchase now and get 10% off with code VIP10! 🚀
                   <span className="block text-[10px] text-neutral-400 mt-2">10:42 AM</span>
                 </div>
                 <div className="bg-[#005c4b] text-white p-3 rounded-xl rounded-tr-sm self-end text-sm max-w-[85%]">
                   Thanks! Just ordered it.
                   <span className="block text-[10px] text-neutral-300 mt-2 text-right">10:45 AM</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. PREMIUM UI AESTHETICS */}
      <section className="py-24 px-6 sm:px-10 bg-[#050505]">
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

      {/* 8. SECURITY & TECH STACK */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a] border-y border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto">
          <IoShieldCheckmarkOutline className="text-5xl text-[#5F14E0] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6">Bank-Grade Security & Architecture</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            We don't use no-code wrappers. Your custom CRM is engineered from scratch using modern web technologies. Hosted on secure AWS/Vercel infrastructure, ensuring your customer data is 100% private, encrypted, and compliant.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-5 py-2 bg-[#141414] border border-neutral-800 rounded-full text-sm font-bold text-neutral-300">Next.js 15</span>
            <span className="px-5 py-2 bg-[#141414] border border-neutral-800 rounded-full text-sm font-bold text-neutral-300">Node.js</span>
            <span className="px-5 py-2 bg-[#141414] border border-neutral-800 rounded-full text-sm font-bold text-neutral-300">PostgreSQL</span>
            <span className="px-5 py-2 bg-[#141414] border border-neutral-800 rounded-full text-sm font-bold text-neutral-300">Redis</span>
            <span className="px-5 py-2 bg-[#141414] border border-neutral-800 rounded-full text-sm font-bold text-neutral-300">AWS / Vercel</span>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 px-6 sm:px-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does it take to build a custom CRM?", a: "For a standard D2C setup (Shopify + Meta Ads + Inventory), it typically takes 4-6 weeks from discovery to deployment." },
              { q: "Can it integrate with Shiprocket or Delhivery?", a: "Yes. We build custom API bridges to any shipping aggregator you use to track NDRs and automate RTO processes." },
              { q: "Is the data secure?", a: "Absolutely. You own the code and the database. It is hosted on your own secure cloud environment (AWS/Vercel)." },
              { q: "How much does it cost?", a: "Pricing depends on the complexity of the integrations required. Fill out the form below, and we'll provide a custom quote within 24 hours." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-lg hover:bg-neutral-900 transition-colors"
                >
                  {faq.q}
                  <IoChevronDownOutline className={`text-[#5F14E0] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-neutral-400 leading-relaxed border-t border-neutral-800 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT FORM */}
      <section id="lead-form" className="py-24 px-6 sm:px-10 bg-[#5F14E0]/5 border-t border-[#5F14E0]/20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
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
