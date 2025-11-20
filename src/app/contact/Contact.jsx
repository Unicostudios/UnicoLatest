"use client";

import React, { useState, useEffect } from "react";
import GridHoverHero from "../components/GridHoverHero";
import ContactForm from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { IoLogoInstagram } from "react-icons/io";
import { LiaLinkedin } from "react-icons/lia";

export default function Contact() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <GridHoverHero
        h1={"Let’s Build Something Unico Together"}
        p={"Have a project in mind? Let’s connect and make it real."}
        btn={"Get In Touch"}
        href={"https://wa.me/+918147057109"}
        target={"_blank"}
      />
      <div className="flex flex-col gap-7 lg:gap-0 px-5 sm:px-14 lg:px-10 items-start lg:flex-row w-full justify-around py-16 text-white">
        <h2 className="font-montserrat-medium lg:pr-10 text-2xl xs:text-3xl md:text-4xl lg:max-w-sm">
          We’re Just a Message Away
        </h2>
        <div className="text-wrap text-sm sm:text-base md:text-lg lg:max-w-xl xl:max-w-2xl">
          Whether you’re looking for strategy, design, development, or the whole
          nine yards — our team is ready to collaborate and elevate your vision.
        </div>
      </div>
      <ContactForm />
      <div className="bg-white/50 w-[90%] md:w-[95%] lg:w-[90%] mx-auto h-[0.5px]" />
      <div className="text-white flex flex-col gap-10 md:gap-0 md:flex-row justify-around w-[85%] mx-auto md:w-full md:items-center pt-16 pb-24 md:pt-20 md:pb-30">
        <div>
          <p className="font-montserrat-medium text-lg">Email</p>
          <a
            href="mailto:contact@unicostudios.in"
            target="_blank"
            className="hover:underline"
          >
            contact@unicostudios.in
          </a>
        </div>
        <div>
          <p className="font-montserrat-medium text-lg">Contact Number</p>
          <a
            href="tel:+918147057109"
            target="_blank"
            className="hover:underline"
          >
            +91 8147057109
          </a>
        </div>
        <div>
          <p className="font-montserrat-medium text-lg">Our Address:</p>
          <p>Bangalore, Karnataka, India</p>
        </div>
        <div className="flex text-3xl gap-2">
          <a
            href="https://www.instagram.com/unico.studioss"
            target="_blank"
            className="hover:text-pink-500"
          >
            <IoLogoInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/unicostudios"
            target="_blank"
            className="hover:text-indigo-700"
          >
            <LiaLinkedin />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
