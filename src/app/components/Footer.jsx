import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Link from "next/link";
import { DarkGridHero } from "./shared/DarkGridHero";

export const Footer = ({ h, p }) => {
  return (
    <>
      <DarkGridHero h={h} p={p} />
      <div className="bg-white pt-5 rounded-t-[50px] sm:rounded-t-[70px]">
        <footer className="relative mx-auto max-w-6xl overflow-hidden py-12">
          <div className="md:px4 grid grid-cols-12 gap-x-1.5 gap-y-6 px-5">
            <LogoColumn />
            <GenericColumn
              title="Content"
              links={[
                {
                  title: "Home",
                  href: "/",
                },
                {
                  title: "About",
                  href: "/about",
                },
                {
                  title: "Services",
                  href: "/services",
                },
                {
                  title: "Portfolio",
                  href: "/work",
                },
              ]}
            />
            <GenericColumn
              title="Follow Us"
              links={[
                {
                  title: "Instagram",
                  href: "https://www.instagram.com/unico.studioss",
                  Icon: SiX,
                },
                {
                  title: "LinkedIn",
                  href: "https://www.linkedin.com/company/unicostudios",
                  Icon: SiInstagram,
                },
                {
                  title: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61566804136686",
                  Icon: SiFacebook,
                },
              ]}
            />
            <GenericColumn
              title="Contact"
              links={[
                {
                  title: "+91 8105459006",
                  href: "https://wa.me/+918105459006",
                },
                {
                  title: "contact@unicostudios.in",
                  href: "mailto:contact@unicostudios.in",
                },
                {
                  title: "Bangalore, India",
                  href: "#",
                },
              ]}
            />
          </div>
        </footer>
      </div>
    </>
  );
};

const LogoColumn = () => {
  return (
    <div className="col-span-6 md:col-span-4">
      <img
        src="/assets/unicoblacklogo.svg"
        alt="Unico Studios"
        className="h-4 md:h-auto"
      />
      <span className="mt-3 inline-block text-xs pr-5">
        Unico Studios - All Rights Reserved
      </span>
    </div>
  );
};

const GenericColumn = ({ title, links }) => {
  return (
    <div className="col-span-6 space-y-2 text-sm md:col-span-2">
      <span className="block font-montserrat-bold uppercase">{title}</span>
      {links.map((l) => (
        <Link
          key={l.title}
          href={l.href}
          className="flex items-center break-all gap-1.5 transition-colors hover:text-indigo-600 hover:underline"
        >
          {l.Icon && <l.Icon />}
          {l.title}
        </Link>
      ))}
    </div>
  );
};

export default Footer;
