"use client";

import React from "react";
import { motion } from "framer-motion";
import Nav from "./NavComp";

export default function Navbar() {
  return (
    <div className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-2xl">
      <div className="py-5 ml-4 xs:ml-6 md:ml-10 w-fit">
        <motion.a href="/">
          <img
            src="/assets/unicologo-white.png"
            alt="Unico Studios"
            className="h-8 md:h-10 cursor-pointer"
          />
        </motion.a>
      </div>
      <div>
        <Nav />
      </div>
    </div>
  );
}
