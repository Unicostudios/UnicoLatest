"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";

const ShiftingContactForm = () => {
  return (
    <section className="p-4 mb-14 mt-5">
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto shadow-lg flex flex-col-reverse lg:flex-row rounded-4xl">
        <Form />
        <Images />
      </div>
    </section>
  );
};

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const services = [
    "Web Design and Development",
    "App Design and Development",
    "Branding",
    "SEO",
    "Performance Marketing",
    "AI Automation",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Manual validation for required service
    if (!service) {
      toast.error("Please select a service!");
      return;
    }

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzouJfPPBTXs7MXPUgQcGFKjNbD0m66uNr0d6_LfLGG-LFS4eHC4BhJWJUvo-RBVUxT/exec";
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Service", service);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setName("");
        setPhone("");
        setService("");
        toast.success("Sent Successfully");
      } else {
        toast.error("Failed to send!");
      }
    } catch (error) {
      console.error("Error!", error.message);
      toast.error("Something went wrong!");
    }
    toast.dismiss(toastId);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-8 px-6 xs:p-10 sm:p-14 w-full text-white transition-colors duration-[750ms] bg-black"
    >
      <h3 className="text-3xl sm:text-4xl font-montserrat-bold mb-6">
        Contact Us
      </h3>

      {/* Name input */}
      <div className="mb-6">
        <p className="text-xl sm:text-2xl mb-2">Name</p>
        <input
          type="text"
          required
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white text-sm sm:text-base transition-colors border duration-[750ms] text-black placeholder-black/50 p-2 rounded-md w-full focus:outline-0"
        />
      </div>

      {/* Phone input */}
      <div className="mb-6">
        <p className="text-xl sm:text-2xl mb-2">Phone No.</p>
        <input
          type="text"
          required
          placeholder="Your Phone No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-white text-sm sm:text-base transition-colors border duration-[750ms] text-black placeholder-black/50 p-2 rounded-md w-full focus:outline-0"
        />
      </div>

      {/* Animated Dropdown */}
      <div className="mb-6 relative" ref={dropdownRef}>
        <p className="text-xl sm:text-2xl mb-2">Choose Service</p>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black p-2 rounded-md cursor-pointer flex justify-between items-center text-sm sm:text-base border border-gray-300"
        >
          <span>{service ? service : "Select a service"}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-600"
          >
            <FaChevronDown />
          </motion.span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 bg-white text-black w-full mt-2 rounded-md border border-gray-300 overflow-hidden shadow-lg max-h-40 overflow-y-auto"
            >
              {services.map((srv) => (
                <motion.li
                  key={srv}
                  whileHover={{ backgroundColor: "#1447E6", color: "#fff" }}
                  className="p-2 cursor-pointer text-sm sm:text-base"
                  onClick={() => {
                    setService(srv);
                    setIsOpen(false);
                  }}
                >
                  {srv}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`bg-[#1447E6] text-white transition-colors duration-[750ms] sm:text-lg text-center rounded-lg w-full py-2 sm:py-3 font-montserrat-medium cursor-pointer mt-3`}
      >
        Submit
      </motion.button>
    </form>
  );
};

const Images = () => {
  return (
    <div className="bg-black relative overflow-hidden w-full min-h-[200px]">
      <div
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744116507/contactbg_h5uibb.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ShiftingContactForm;
