"use client";

import React, { useState } from "react";
import NavbarWrapper from "../components/NavbarWrapper";
import { Footer } from "../components/Footer";
import { toast } from "react-hot-toast";
import { 
  IoArrowForwardCircleOutline, 
  IoLogoWhatsapp, 
  IoAnalyticsOutline,
  IoHardwareChipOutline,
  IoChatbubblesOutline,
  IoStatsChartOutline,
  IoShieldCheckmarkOutline,
  IoChevronDownOutline,
  IoCodeWorkingOutline,
  IoBusinessOutline
} from "react-icons/io5";
import { 
  SiSalesforce, 
  SiHubspot, 
  SiShopify, 
  SiSlack, 
  SiZapier, 
  SiMeta,
  SiGoogleads,
  SiZendesk,
  SiOpenai
} from "react-icons/si";

export default function CustomAIAgentsLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [automationNeeds, setAutomationNeeds] = useState("");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#03000a] min-h-screen text-white font-montserrat-regular selection:bg-[#00f0ff] selection:text-black overflow-x-hidden">
      <NavbarWrapper theme="dark" />
      
      {/* 1. HERO SECTION (CYBER-AESTHETIC) */}
      <section className="relative pt-32 pb-24 px-6 sm:px-10 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Dynamic Glowing Orbs */}
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#00f0ff] opacity-10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#7000ff] opacity-20 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 text-[#00f0ff] text-xs sm:text-sm font-bold mb-8 tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <IoHardwareChipOutline className="text-lg" /> Bengaluru's Elite AI Architects
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.1] mb-8 tracking-tight">
            Stop Doing <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#7000ff] to-[#ff00e5] animate-gradient-x">
              Robotic Work.
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            We engineer autonomous, private AI Agents that live inside your WhatsApp, Slack, and CRM. They sell, support, and analyze—<strong className="text-white">24/7/365</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={scrollToForm} className="w-full sm:w-auto bg-gradient-to-r from-[#00f0ff] to-[#7000ff] hover:opacity-90 transition-opacity px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(112,0,255,0.5)] text-lg text-black">
              <span>Deploy Your First Agent</span>
              <IoArrowForwardCircleOutline className="text-3xl" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE PARADIGM SHIFT (PROBLEM) */}
      <section className="py-24 px-6 sm:px-10 relative z-20 bg-[#05020f] border-y border-[#7000ff]/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-16">The Business Execution Gap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-400">Lost Leads at 2 AM</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Human sales reps sleep. When high-intent prospects message your business on WhatsApp at night, the delay in response kills the conversion.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-400">Data Entry Paralysis</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Your best closers spend 30% of their day typing notes into Salesforce or HubSpot instead of actually talking to clients.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-400">Hidden Ad Waste</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Marketing managers check dashboards once a day. When an ad campaign's ROAS crashes at noon, you bleed cash until tomorrow.</p>
            </div>
          </div>
          <div className="mt-16 inline-block p-[1px] rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7000ff]">
            <div className="px-8 py-4 bg-[#05020f] rounded-full text-[#00f0ff] font-bold tracking-widest uppercase text-sm">
              Our AI Agents Solve All Of This. Instantly.
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTEGRATION ECOSYSTEM */}
      <section className="py-20 bg-[#03000a] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <h3 className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Seamless Native Integrations</h3>
        </div>
        {/* CSS Marquee effect container */}
        <div className="w-full flex space-x-16 px-10 overflow-hidden opacity-50 justify-center flex-wrap">
          <SiSalesforce className="text-5xl hover:text-[#00A1E0] hover:scale-110 transition-all cursor-pointer" />
          <SiHubspot className="text-5xl hover:text-[#FF7A59] hover:scale-110 transition-all cursor-pointer" />
          <SiShopify className="text-5xl hover:text-[#96BF48] hover:scale-110 transition-all cursor-pointer" />
          <SiSlack className="text-5xl hover:text-[#E01E5A] hover:scale-110 transition-all cursor-pointer" />
          <SiZapier className="text-5xl hover:text-[#FF4A00] hover:scale-110 transition-all cursor-pointer" />
          <SiMeta className="text-5xl hover:text-[#0668E1] hover:scale-110 transition-all cursor-pointer" />
          <SiZendesk className="text-5xl hover:text-[#03363D] hover:scale-110 transition-all cursor-pointer" />
          <SiOpenai className="text-5xl hover:text-[#10A37F] hover:scale-110 transition-all cursor-pointer" />
        </div>
      </section>

      {/* 4. DEEP DIVE 1: WHATSAPP SALES AGENT */}
      <section className="py-24 px-6 sm:px-10 bg-[#05020f] border-t border-[#7000ff]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative">
             <div className="absolute inset-0 bg-[#25D366] opacity-10 blur-[100px] rounded-full" />
             <div className="bg-[#0b141a] rounded-[2rem] p-6 font-sans max-w-sm mx-auto border border-[#25D366]/30 shadow-2xl relative z-10">
               {/* Header */}
               <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-tr from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center">
                   <IoHardwareChipOutline className="text-white text-xl" />
                 </div>
                 <div>
                   <p className="font-bold text-white text-sm">Unico Sales AI</p>
                   <p className="text-[10px] text-green-400">Online • Has CRM Access</p>
                 </div>
               </div>
               {/* Chat Mockup */}
               <div className="flex flex-col gap-4 text-[13px]">
                 <div className="bg-[#202c33] text-white p-3 rounded-xl rounded-tl-none self-start max-w-[85%] border border-neutral-700">
                   Hi! Does your SaaS handle multi-currency payments?
                 </div>
                 <div className="bg-[#005c4b] text-white p-3 rounded-xl rounded-tr-none self-end max-w-[85%] shadow-lg">
                   Hello! Yes, we support 135+ currencies natively via Stripe integration. 🌍 Would you like me to book a 15-min demo for you tomorrow?
                   <span className="block text-[9px] text-[#8696a0] mt-1 text-right">Read from docs • 2:14 AM</span>
                 </div>
                 <div className="bg-[#202c33] text-white p-3 rounded-xl rounded-tl-none self-start max-w-[85%] border border-neutral-700">
                   Yes, 11 AM works.
                 </div>
                 <div className="bg-[#005c4b] text-white p-3 rounded-xl rounded-tr-none self-end max-w-[85%] shadow-lg">
                   Perfect! I've booked it on your calendar and added your profile to Salesforce. See you then! 📅
                   <span className="block text-[9px] text-[#8696a0] mt-1 text-right">API Executed • 2:15 AM</span>
                 </div>
               </div>
             </div>
          </div>
          <div className="flex-1">
            <div className="w-14 h-14 bg-[#25D366]/10 rounded-xl flex items-center justify-center mb-6 border border-[#25D366]/50">
              <IoLogoWhatsapp className="text-3xl text-[#25D366]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">The Autonomous <br/><span className="text-[#25D366]">WhatsApp Closer</span></h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              Our AI doesn't just give pre-written answers. It connects to your internal knowledge base (RAG) to answer highly complex technical questions instantly. 
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              It has direct read/write access to your calendar and CRM. It qualifies the lead, schedules the Google Meet, and updates HubSpot—all via a WhatsApp conversation at 2 AM.
            </p>
          </div>
        </div>
      </section>

      {/* 5. DEEP DIVE 2: DATA & ANALYTICS AGENT */}
      <section className="py-24 px-6 sm:px-10 bg-[#03000a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-[#00f0ff] opacity-10 blur-[100px] rounded-full" />
            <div className="bg-[#0f0a1c] p-6 rounded-3xl border border-[#00f0ff]/30 shadow-2xl relative z-10">
               {/* Slack/Discord style Mockup */}
               <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                 <SiSlack className="text-[#E01E5A] text-xl" /> <span className="font-bold text-sm text-white">#marketing-alerts</span>
               </div>
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#00f0ff] to-[#7000ff] shrink-0 flex items-center justify-center shadow-lg">
                   <IoStatsChartOutline className="text-white" />
                 </div>
                 <div>
                   <div className="flex items-baseline gap-2">
                     <span className="font-bold text-white text-sm">ROAS Sentinel AI</span>
                     <span className="text-xs text-neutral-500">APP • Just now</span>
                   </div>
                   <div className="mt-2 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                     <p className="text-red-400 font-bold text-sm mb-1">⚠️ Urgent Campaign Alert</p>
                     <p className="text-neutral-300 text-xs leading-relaxed">
                       The 'Summer_Sale_Bangalore' Meta Ads campaign ROAS has dropped below your minimum threshold (1.2x) for the last 3 hours. Current ROAS is 0.8x.
                     </p>
                     <div className="mt-3 flex gap-2">
                       <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md font-bold transition-colors">Pause Campaign Now</button>
                       <button className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-md font-bold transition-colors">Ignore</button>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-14 h-14 bg-[#00f0ff]/10 rounded-xl flex items-center justify-center mb-6 border border-[#00f0ff]/50">
              <IoAnalyticsOutline className="text-3xl text-[#00f0ff]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">The Unsleeping <br/><span className="text-[#00f0ff]">Growth Analyst</span></h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              Marketing moves fast. Relying on humans to refresh ad dashboards leads to thousands of dollars in wasted ad spend.
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              We deploy automated data agents that monitor your Google, Meta, and Shopify APIs every 5 minutes. If anomalies are detected (sudden drop in conversions, spike in CPA), the agent alerts you immediately on Slack or WhatsApp, and can even auto-pause bleeding campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEEP DIVE 3: INTERNAL OPERATIONS */}
      <section className="py-24 px-6 sm:px-10 bg-[#05020f] border-t border-[#7000ff]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-[#ff00e5] opacity-10 blur-[100px] rounded-full" />
            
            <div className="grid grid-cols-1 gap-4 relative z-10">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff00e5]/20 flex items-center justify-center border border-[#ff00e5]/50"><IoChatbubblesOutline className="text-[#ff00e5]" /></div>
                  <div>
                    <p className="font-bold text-sm">Voice Memo Uploaded</p>
                    <p className="text-xs text-neutral-400">"Client wants 50 licenses..."</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] rounded-full border border-green-500/30 uppercase font-bold tracking-wider">Processed</div>
              </div>
              <div className="flex justify-center -my-2"><IoArrowForwardCircleOutline className="text-neutral-600 text-2xl rotate-90" /></div>
              <div className="bg-[#0a1a2f] p-5 rounded-2xl border border-blue-500/30 flex items-center justify-between shadow-[0_0_20px_rgba(0,161,224,0.15)]">
                <div className="flex items-center gap-4">
                  <SiSalesforce className="text-[#00A1E0] text-3xl" />
                  <div>
                    <p className="font-bold text-sm text-[#00A1E0]">Salesforce Updated</p>
                    <p className="text-xs text-neutral-400">Deal size updated to $15,000</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#00A1E0] flex items-center justify-center"><IoShieldCheckmarkOutline className="text-white text-xs" /></div>
              </div>
            </div>

          </div>
          <div className="flex-1">
            <div className="w-14 h-14 bg-[#ff00e5]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ff00e5]/50">
              <IoCodeWorkingOutline className="text-3xl text-[#ff00e5]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">The Invisible <br/><span className="text-[#ff00e5]">Operations Engine</span></h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              Your sales and operations teams should be talking to humans, not typing into databases. 
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              Our Voice-to-CRM agents allow field reps or account executives to simply drop a 30-second voice note into a WhatsApp group. The AI transcribes it, extracts key entities (Deal Size, Next Steps, Contact Info), and perfectly maps it to your Salesforce or HubSpot records. Zero clicks required.
            </p>
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURE & SECURITY */}
      <section className="py-24 px-6 sm:px-10 bg-[#03000a] text-center border-t border-[#7000ff]/20">
        <div className="max-w-4xl mx-auto">
          <IoShieldCheckmarkOutline className="text-6xl text-[#00f0ff] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6">Enterprise-Grade AI Infrastructure</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            We don't use simple "ChatGPT wrappers" that leak your proprietary data to public models. We engineer robust, private architectures using LangChain, Vector Databases, and secure LLM routing hosted on your own AWS or Vercel servers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-[#05020f] border border-[#7000ff]/30 shadow-[0_0_15px_rgba(112,0,255,0.1)] rounded-full text-sm font-bold text-white">Private LLMs (Llama 3 / Claude)</span>
            <span className="px-6 py-3 bg-[#05020f] border border-[#7000ff]/30 shadow-[0_0_15px_rgba(112,0,255,0.1)] rounded-full text-sm font-bold text-white">Pinecone Vector DBs</span>
            <span className="px-6 py-3 bg-[#05020f] border border-[#7000ff]/30 shadow-[0_0_15px_rgba(112,0,255,0.1)] rounded-full text-sm font-bold text-white">LangChain Architecture</span>
            <span className="px-6 py-3 bg-[#05020f] border border-[#7000ff]/30 shadow-[0_0_15px_rgba(112,0,255,0.1)] rounded-full text-sm font-bold text-white">AWS / Vercel Enclaves</span>
          </div>
        </div>
      </section>

      {/* 8. THE BENGALURU STANDARD (WHY US) */}
      <section className="py-24 px-6 sm:px-10 bg-[#05020f]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-6 leading-tight">
              Why Unico Studios is <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7000ff]">Bengaluru's Best.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              The AI landscape is crowded with beginners and template-sellers. At Unico Studios, our elite engineering team builds autonomous systems that genuinely save thousands of human hours per month.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Based natively in Bangalore, we sit down with you, map your bottlenecks, and deploy code that works on day one.
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="rounded-3xl p-10 bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7000ff] opacity-20 blur-[80px] rounded-full" />
              <ul className="space-y-8 relative z-10">
                <li className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-black font-black">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white">True Custom Engineering</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">We write the raw Python and Node.js logic tailored to your exact business rules, rather than forcing you into a rigid SaaS tool.</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-black font-black">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white">Zero Hallucinations</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">Through rigorous RAG (Retrieval-Augmented Generation) bounding, our agents never invent facts. They only speak the truth found in your company docs.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 px-6 sm:px-10 bg-[#03000a] border-t border-[#7000ff]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-montserrat-medium mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can the AI Agent actually update my Salesforce?", a: "Yes. We build custom API wrappers that allow the AI to not just read, but write data (like deal stages, contact info) directly into your CRM securely." },
              { q: "What happens if the AI doesn't know the answer?", a: "We program a 'Human Handoff' protocol. If the confidence score drops below 95%, the agent immediately routes the conversation to a human rep on WhatsApp or Slack." },
              { q: "Is our company data used to train public models?", a: "No. We use Enterprise API tiers (OpenAI, Anthropic) which guarantee strict zero-data-retention policies. Your IP remains entirely yours." },
              { q: "How long does deployment take?", a: "Depending on the complexity of the CRM integration and knowledge base size, a fully functional bespoke agent takes 3 to 6 weeks to deploy." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  {faq.q}
                  <IoChevronDownOutline className={`text-[#00f0ff] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-neutral-400 leading-relaxed border-t border-white/10 pt-4 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT FORM (CYBER CTA) */}
      <section id="lead-form" className="py-24 px-6 sm:px-10 bg-gradient-to-b from-[#03000a] to-[#05020f] border-t border-[#7000ff]/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#7000ff] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="flex-1 text-white">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-bold mb-6 uppercase tracking-widest">
              Limited Availability
            </div>
            <h2 className="text-4xl sm:text-6xl font-black leading-tight mb-6">
              Hire Your Next <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7000ff]">Best Employee.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
              Tell us which manual processes are slowing your business down. We'll design a custom AI agent workflow that automates them flawlessly.
            </p>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 inline-block backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-2">Direct Access to Architects</p>
              <a href="https://wa.me/918147057109" className="text-white hover:text-[#00f0ff] transition-colors flex items-center gap-3 font-bold text-lg">
                <IoLogoWhatsapp className="text-[#25D366] text-3xl" /> +91 81470 57109
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-[2rem] w-full mx-auto p-8 sm:p-10 bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(112,0,255,0.15)] relative overflow-hidden backdrop-blur-xl">
              <p className="text-white text-2xl font-bold mb-2">Request an AI Audit</p>
              <p className="text-neutral-400 text-sm mb-8">We respond within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-neutral-600 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  placeholder="Phone No."
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-neutral-600 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  required
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-neutral-600 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all appearance-none"
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
                  className="bg-black/50 border border-white/10 w-full text-white text-sm sm:text-base outline-none py-4 px-5 rounded-xl placeholder:text-neutral-600 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all resize-none"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#00f0ff] to-[#7000ff] hover:opacity-90 transition-opacity text-black mt-2 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-lg"
                >
                  <span>Initialize AI</span>
                  <IoBusinessOutline className="text-2xl" />
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
