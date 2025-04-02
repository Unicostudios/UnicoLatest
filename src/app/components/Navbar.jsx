import React from "react";
import { motion } from "framer-motion";
import NavComp from "./NavComp";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-black/30 backdrop-blur-2xl">
      <div className="py-7 ml-5 xs:ml-7 md:ml-10">
        <motion.a href="/">
          <img
            src="/assets/unicologo.svg"
            alt="Unico Studios"
            className="h-4 xs:h-5 md:h-6 cursor-pointer"
          />
        </motion.a>
      </div>
      <div>
        <NavComp />
      </div>
    </div>
  );
}
