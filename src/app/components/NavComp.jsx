"use client";

import React, { useState } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { LiaFacebookSquare, LiaLinkedin } from "react-icons/lia";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import Contact from "./ui/NavBtn";

export default function Nav() {
  const [active, setActive] = useState(false);

  return (
    <>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
    </>
  );
}

const LinksOverlay = () => {
  return (
    <nav className="fixed right-0 top-0 z-40 h-[calc(100vh_-_0px)] w-[calc(100%_-_0px)] overflow-hidden">
      <Logo />
      <LinksContainer />
      <FooterCTAs />
    </nav>
  );
};

const LinksContainer = () => {
  return (
    <motion.div className="space-y-4 p-6 xs:p-9 md:p-14 lg:p-16">
      {LINKS.map((l, idx) => {
        return (
          <NavLink key={l.title} href={l.href} idx={idx}>
            {l.title}
          </NavLink>
        );
      })}
    </motion.div>
  );
};

const NavLink = ({ children, href, idx }) => {
  return (
    <motion.a
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.25,
          duration: 0.7,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0 }}
      href={href}
      className="group flex justify-between text-3xl xxs:text-4xl xs:text-5xl font-montserrat-bold text-white duration-500 hover:text-[#5F14E0] ease-in-out md:text-6xl uppercase transition-colors"
    >
      {children}
      <BsArrowUpRightCircle className="group-hover:rotate-45 transition-all duration-500" />
    </motion.a>
  );
};

const Logo = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="/"
      className="grid pt-5 w-20 xs:w-30 md:w-44 lg:w-48 h-18 md:h-22 place-content-center rounded-br-xl rounded-tl-xl transition-colors"
    >
      <img
        src="/assets/unicologo-white.png"
        alt="Immersified"
        className="h-8 xs:h-10 md:h-12"
      />
    </motion.a>
  );
};

const HamburgerButton = ({ active, setActive }) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        className="fixed h-[50px] md:h-[60px] w-[55px] md:w-[70px] z-10"
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`group fixed right-1 top-1 md:top-2 md:right-3 z-50 h-16 w-16 transition-all hover:cursor-pointer rounded-lg`}
        aria-label={active ? "Close menu" : "Open menu"}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-[2px] md:h-1 w-7 md:w-10 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-[2px] md:h-1 w-7 md:w-10 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className={`${
            active ? "hidden" : "block"
          } absolute h-[2.5px] md:h-1 w-3 md:w-5 bg-white 
             left-1/2 bottom-1/2 -translate-x-[70%] md:-translate-x-1/2 translate-y-1/2`}
        />
      </motion.button>
    </>
  );
};

const FooterCTAs = () => {
  return (
    <div className="flex flex-col gap-8 xs:gap-0 xs:flex-row justify-between xs:items-center pt-10 xs:pt-12 px-8 md:pl-18 lg:pl-22">
      <div className="flex gap-3">
        {SOCIAL_CTAS.map((l, idx) => {
          return (
            <motion.a
              key={idx}
              href={l.href}
              target="_blank"
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <l.Component className="text-3xl text-white transition-colors hover:text-[#5F14E0]" />
            </motion.a>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
      >
        <Contact />
      </motion.button>
    </div>
  );
};

const LINKS = [
  {
    title: "Home.",
    href: "/",
  },
  {
    title: "About Us.",
    href: "/about",
  },
  {
    title: "Services.",
    href: "/services",
  },
  {
    title: "Our Work.",
    href: "/work",
  },
  {
    title: "AI Tools.",
    href: "/tools",
  },
  {
    title: "Contact.",
    href: "/contact",
  },
];

const SOCIAL_CTAS = [
  {
    Component: IoLogoInstagram,
    href: "https://www.instagram.com/unico.studioss",
  },
  {
    Component: LiaFacebookSquare,
    href: "https://www.facebook.com/profile.php?id=61566804136686",
  },
  {
    Component: LiaLinkedin,
    href: "https://www.linkedin.com/company/unicostudios",
  },
];

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100%)",
    height: "calc(100vh)",
    top: 0,
    right: 0,
    backgroundColor: "#191919",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    top: 10,
    right: 10,
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  },
};

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};
