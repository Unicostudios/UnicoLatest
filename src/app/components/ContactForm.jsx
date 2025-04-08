"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`p-6 xs:p-10 sm:p-14 w-full text-white transition-colors duration-[750ms] ${
        selected === "company" ? "bg-black" : "bg-black"
      }`}
    >
      <h3 className="text-3xl sm:text-4xl font-montserrat-bold mb-6">Contact Us</h3>

      {/* Name input */}
      <div className="mb-6">
        <p className="text-xl sm:text-2xl mb-2">Hello! My name is...</p>
        <input
          type="text"
          required
          placeholder="Your Name..."
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
          className={`${
            selected === "company" ? "bg-white" : "bg-white"
          } text-sm sm:text-base transition-colors border duration-[750ms] text-black min-h-[150px] resize-none placeholder-black/50 p-2 rounded-md w-full focus:outline-0`}
        />
      </div>

      {/* Submit */}
      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.99,
        }}
        type="submit"
        className={`${
          selected === "company"
            ? "bg-[#1447E6] text-white"
            : "bg-[#1447E6] text-white"
        } transition-colors duration-[750ms] sm:text-lg text-center rounded-lg w-full py-2 sm:py-3 font-semibold cursor-pointer`}
      >
        Submit
      </motion.div>
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
            "url(https://res.cloudinary.com/dmfisp8ue/image/upload/v1744116507/contactbg_h5uibb.jpg)",
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
            "url(https://res.cloudinary.com/dmfisp8ue/image/upload/v1744116507/contactbg_h5uibb.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ShiftingContactForm;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };
