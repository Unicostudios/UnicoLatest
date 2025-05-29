"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";

const ShiftingContactForm = () => {
  const [selected, setSelected] = useState("individual");
  return (
    <section className="p-4 mb-14 mt-5">
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto shadow-lg flex flex-col-reverse lg:flex-row rounded-4xl overflow-hidden">
        <Form selected={selected} setSelected={setSelected} />
        <Images selected={selected} />
      </div>
    </section>
  );
};

const Form = ({ selected, setSelected }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzZ75q3j_OWwSsaA9Vi-n13IuU1Pot03z6_KcIT76r3_HcaGO8E2L_CLbrEQFkFXKVw/exec";
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Company", company);
    formData.append("Message", message);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // console.log("Success!", response);
        setName("");
        setCompany("");
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
    <form
      onSubmit={handleSubmit}
      className={`p-6 xs:p-10 sm:p-14 w-full text-white transition-colors duration-[750ms] ${
        selected === "company" ? "bg-black" : "bg-black"
      }`}
    >
      <h3 className="text-3xl sm:text-4xl font-montserrat-bold mb-6">
        Contact Us
      </h3>
      {/* Name input */}
      <div className="mb-6">
        <p className="text-xl sm:text-2xl mb-2">Hello! My name is...</p>
        <input
          type="text"
          required
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${
            selected === "company" ? "bg-white" : "bg-white"
          } text-sm sm:text-base transition-colors border duration-[750ms] text-black placeholder-black/50 p-2 rounded-md w-full focus:outline-0`}
        />
      </div>
      {/* Company/individual toggle */}
      <div className="mb-6">
        <p className="text-xl sm:text-2xl mb-2">and I represent...</p>
        <FormSelect selected={selected} setSelected={setSelected} />
      </div>
      {/* Company name */}
      <AnimatePresence>
        {selected === "company" && (
          <motion.div
            initial={{
              // 104 === height of element + margin
              // Alternatively can use mode='popLayout' on AnimatePresence
              // and add the "layout" prop to relevant elements to reduce
              // distortion
              marginTop: -104,
              opacity: 0,
            }}
            animate={{
              marginTop: 0,
              opacity: 1,
            }}
            exit={{
              marginTop: -104,
              opacity: 0,
            }}
            transition={BASE_TRANSITION}
            className="mb-6"
          >
            <p className="text-xl sm:text-2xl mb-2">by the name of...</p>
            <input
              type="text"
              required
              placeholder="Your company name..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`${
                selected === "company" ? "bg-white" : "bg-white"
              } text-sm sm:text-base transition-colors duration-[750ms] text-black placeholder-black/50 border p-2 rounded-md w-full focus:outline-0`}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Info */}
      <div className="mb-6">
        <p className="text-xl sm:text-2xl mb-2">I'd love to ask about...</p>
        <textarea
          required
          placeholder="Whatever your heart desires :)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${
            selected === "company" ? "bg-white" : "bg-white"
          } text-sm sm:text-base transition-colors border duration-[750ms] text-black min-h-[150px] resize-none placeholder-black/50 p-2 rounded-md w-full focus:outline-0`}
        />
      </div>
      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.99,
        }}
        className={`${
          selected === "company"
            ? "bg-[#1447E6] text-white"
            : "bg-[#1447E6] text-white"
        } transition-colors duration-[750ms] sm:text-lg text-center rounded-lg w-full py-2 sm:py-3 font-montserrat-medium cursor-pointer`}
      >
        Submit
      </motion.button>
    </form>
  );
};

const FormSelect = ({ selected, setSelected }) => {
  return (
    <div className="border-[0.5px] rounded-md flex border-white overflow-hidden font-montserrat-medium w-fit">
      <div
        className={`${
          selected === "individual" ? "bg-[#1447E6]" : "bg-black"
        } text-xs sm:text-sm px-3 py-1.5 transition-colors duration-[750ms] relative`}
        onClick={() => setSelected("individual")}
      >
        <span className="relative z-10 cursor-pointer">An individual</span>
        {selected === "individual" && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId="form-tab"
            className="absolute inset-0 bg-[#1447E6] z-0"
          />
        )}
      </div>
      <div
        className={`${
          selected === "company" ? "bg-[#1447E6]" : "bg-black"
        } text-xs sm:text-sm px-3 py-1.5 transition-colors duration-[750ms] relative`}
        onClick={() => setSelected("company")}
      >
        <span className="relative z-10 cursor-pointer">A company</span>
        {selected === "company" && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId="form-tab"
            className="absolute inset-0 bg-[#1447E6] z-0"
          />
        )}
      </div>
    </div>
  );
};

const Images = ({ selected }) => {
  return (
    <div className="bg-black relative overflow-hidden w-full min-h-[200px]">
      <motion.div
        initial={false}
        animate={{
          x: selected === "individual" ? "0%" : "100%",
        }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744116507/contactbg_h5uibb.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          x: selected === "company" ? "0%" : "-100%",
        }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744145310/immersifiedbranding2_urxnwy.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ShiftingContactForm;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };
