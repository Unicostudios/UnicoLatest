"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { 
  IoArrowForwardCircleOutline, 
  IoLogoWhatsapp, 
  IoFlashOutline, 
  IoTimeOutline, 
  IoAnalyticsOutline 
} from "react-icons/io5";
import { 
  SiSalesforce, 
  SiHubspot, 
  SiShopify, 
  SiSlack, 
  SiZapier, 
  SiMeta,
  SiGoogleads,
  SiZendesk
} from "react-icons/si";

export default function CustomAILandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [automationNeeds, setAutomationNeeds] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = "https://script.google.com/macros/s/AKfycbwbd_NSDKHZYN70TsQwDD3uzQYaiHy1CVlTKEfBSqieD347NnV6jUw4iNVbj9uFRC1vZQ/exec";
    
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Message", `[AI Agents LP - ${automationNeeds}] ${message}`);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setName("");
        setPhone("");
        setAutomationNeeds("");
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
      <section className="relative pt-32 pb-24 px-6 sm:px-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#5F14E0] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-5 py-2 rounded-full border border-[#5F14E0]/40 bg-[#5F14E0]/10 text-[#c2a3ff] text-xs sm:text-sm font-bold mb-8 tracking-widest uppercase">
            ⚡ BENGALURU'S #1 AI AUTOMATION AGENCY
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-montserrat-medium leading-tight mb-8">
            Replace Manual Work with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F14E0] to-[#b785f5]">
              Custom AI Agents
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Stop relying on generic AI wrappers. Unico Studios builds bespoke, deeply integrated AI Agents that handle your WhatsApp sales, ad reminders, customer support, and internal operations 24/7. We simply out-execute every other agency in Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToForm} className="w-full sm:w-auto bg-[#5F14E0] hover:bg-[#7228f4] transition-all px-8 py-5 rounded-full font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(95,20,224,0.4)] text-lg">
              <span>Automate My Business</span>
              <IoArrowForwardCircleOutline className="text-2xl" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTEGRATIONS LOGOS */}
      <section className="py-12 border-y border-neutral-800 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <p className="text-center text-neutral-500 font-semibold tracking-wider text-sm mb-8 uppercase">
            Our AI Agents Integrate Seamlessly With Your Existing Tools
          </p>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16 opacity-70">
            <div className="flex items-center gap-2 hover:text-[#00A1E0] hover:opacity-100 transition-all text-neutral-400 text-3xl"><SiSalesforce /> <span className="text-lg font-bold">Salesforce</span></div>
            <div className="flex items-center gap-2 hover:text-[#FF7A59] hover:opacity-100 transition-all text-neutral-400 text-3xl"><SiHubspot /> <span className="text-lg font-bold">HubSpot</span></div>
            <div className="flex items-center gap-2 hover:text-[#96BF48] hover:opacity-100 transition-all text-neutral-400 text-3xl"><SiShopify /> <span className="text-lg font-bold">Shopify</span></div>
            <div className="flex items-center gap-2 hover:text-[#E01E5A] hover:opacity-100 transition-all text-neutral-400 text-3xl"><SiSlack /> <span className="text-lg font-bold">Slack</span></div>
            <div className="flex items-center gap-2 hover:text-[#FF4A00] hover:opacity-100 transition-all text-neutral-400 text-3xl"><SiZapier /> <span className="text-lg font-bold">Zapier</span></div>
            <div className="flex items-center gap-2 hover:text-[#03363D] hover:opacity-100 transition-all text-neutral-400 text-3xl"><SiZendesk /> <span className="text-lg font-bold">Zendesk</span></div>
          </div>
        </div>
      </section>

      {/* 3. WHAT OUR AGENTS DO */}
      <section className="py-24 px-6 sm:px-10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-4">Agents that Act. Not just Chat.</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Unlike generic chatbots, our AI agents have access to your CRM, databases, and ads to make decisions and execute actions instantly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <IoLogoWhatsapp className="text-4xl text-[#5F14E0] mb-4" />,
                title: "WhatsApp Sales & Support Agents",
                desc: "Never miss a lead. Our AI agents qualify leads, answer complex FAQs by reading your docs, and schedule meetings directly in WhatsApp, 24/7."
              },
              {
                icon: <IoAnalyticsOutline className="text-4xl text-[#5F14E0] mb-4" />,
                title: "Ad Spend & ROAS Reminders",
                desc: "An AI agent that monitors your Meta and Google Ads. It alerts you via Slack or WhatsApp the moment a campaign's ROAS drops below your threshold."
              },
              {
                icon: <IoFlashOutline className="text-4xl text-[#5F14E0] mb-4" />,
                title: "CRM Sync & Data Entry",
                desc: "Sales agents hate data entry. Our voice-to-text AI listens to sales calls and automatically updates Salesforce or HubSpot records in real-time."
              },
              {
                icon: <IoTimeOutline className="text-4xl text-[#5F14E0] mb-4" />,
                title: "Inventory & Procurement Alerts",
                desc: "An agent that watches your Shopify stock levels, calculates burn rate, and automatically emails your suppliers when it's time to reorder."
              }
            ].map((agent, idx) => (
              <div key={idx} className="bg-[#121212] border border-neutral-800 p-8 rounded-3xl hover:border-[#5F14E0] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F14E0] opacity-5 blur-[40px] rounded-full group-hover:opacity-20 transition-opacity" />
                <div className="group-hover:scale-110 transition-transform origin-left relative z-10">{agent.icon}</div>
                <h3 className="text-2xl font-bold mb-3 relative z-10">{agent.title}</h3>
                <p className="text-neutral-400 leading-relaxed relative z-10">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY WE ARE THE BEST IN BENGALURU */}
      <section className="py-24 px-6 sm:px-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <div className="rounded-2xl p-10 bg-gradient-to-br from-[#141414] to-black border border-[#5F14E0]/30 shadow-[0_0_50px_rgba(95,20,224,0.15)] relative">
              <h3 className="text-2xl font-bold mb-6">The Bengaluru Standard</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5F14E0]/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#a87ffb] font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">True Custom Engineering</h4>
                    <p className="text-neutral-400">Competitors sell you off-the-shelf wrappers. We build custom Python/Node architectures tailored to your exact business logic.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5F14E0]/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#a87ffb] font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Enterprise-Grade Security</h4>
                    <p className="text-neutral-400">Your data never trains public models. We deploy secure, private LLM pipelines ensuring 100% data confidentiality.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5F14E0]/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-[#a87ffb] font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Local Support & Training</h4>
                    <p className="text-neutral-400">Based in Bangalore, we don't just hand over the code. We train your team on how to manage and scale alongside the AI.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">
              Why Unico Studios is <br/> <span className="text-[#a87ffb]">Bengaluru's Best.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              The AI landscape is crowded with beginners. At Unico Studios, our elite engineering team builds autonomous systems that genuinely save thousands of human hours per month.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Whether you are a SaaS startup in HSR or a massive D2C operation in Indiranagar, we guarantee more reliable, faster, and smarter AI implementations than any other agency in the city.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section id="lead-form" className="py-24 px-6 sm:px-10 bg-[#5F14E0]/5 border-t border-[#5F14E0]/20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Copy */}
          <div className="flex-1 text-white">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium leading-tight mb-6">
              Hire Your Next <br/> Best Employee.
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Tell us which manual processes are slowing your business down. We'll design a custom AI agent workflow that automates them flawlessly.
            </p>
            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 inline-block">
              <p className="font-bold mb-1">Consult with an AI Architect</p>
              <a href="https://wa.me/918147057109" className="text-[#a87ffb] hover:text-white transition-colors flex items-center gap-2 mt-3">
                <IoLogoWhatsapp className="text-2xl" /> WhatsApp: +91 81470 57109
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-3xl w-full mx-auto p-8 sm:p-10 bg-[#121212] border border-neutral-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F14E0] opacity-20 blur-[50px] rounded-full" />
              <p className="text-white text-xl sm:text-2xl font-montserrat-medium mb-6 relative z-10">
                Get a Free AI Strategy
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
                  placeholder="Phone No."
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  required
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all appearance-none"
                  value={automationNeeds}
                  onChange={(e) => setAutomationNeeds(e.target.value)}
                >
                  <option value="" disabled>What do you want to automate?</option>
                  <option value="WhatsApp Customer Support">WhatsApp Customer Support</option>
                  <option value="Sales / Lead Qualification">Sales / Lead Qualification</option>
                  <option value="Internal CRM Syncing">Internal CRM Syncing</option>
                  <option value="Marketing / Ad Reporting">Marketing / Ad Reporting</option>
                  <option value="Other Operations">Other Operations</option>
                </select>
                <textarea
                  required
                  placeholder="Tell us what CRM or tools you currently use..."
                  className="border-neutral-700 bg-[#1a1a1a] border w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-gray-500 focus:border-[#5F14E0] focus:ring-1 focus:ring-[#5F14E0] transition-all resize-none"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#5F14E0] hover:bg-[#7228f4] transition-colors text-white mt-2 w-full py-4 rounded-xl font-montserrat-medium flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(95,20,224,0.39)] hover:shadow-[0_6px_20px_rgba(95,20,224,0.23)] text-lg"
                >
                  <span>Request AI Audit</span>
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
