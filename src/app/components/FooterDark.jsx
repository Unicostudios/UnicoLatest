import React from "react";
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#191919] text-white rounded-t-[50px] md:rounded-t-[70px]">
        <footer className="relative mx-auto max-w-6xl overflow-hidden py-12">
          <div className="pl-10 xxs:pl-5 grid grid-cols-1 xxs:grid-cols-12 gap-x-1.5 gap-y-6 sm:gap-0 sm:flex justify-around">
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
                  Icon: SiInstagram,
                },
                {
                  title: "LinkedIn",
                  href: "https://www.linkedin.com/company/unicostudios",
                  Icon: SiLinkedin,
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
    </div>
  );
};

const LogoColumn = () => {
  return (
    <div className="col-span-6 md:col-span-4">
      <img
        src="/assets/unicologo.svg"
        alt="Unico Studios"
        className="h-3 xxs:h-3.5 sm:h-4 md:h-auto"
      />
      <span className="mt-3 inline-block text-[10px] xxs2:text-xs pr-5">
        Unico Studios <br className="hidden xxs:block md:hidden" />{" "}
        <span className="xxs:hidden md:inline">-</span> All Rights Reserved
      </span>
    </div>
  );
};

const GenericColumn = ({ title, links }) => {
  return (
    <div className="col-span-6 space-y-2 text-xs xxs2:text-sm md:col-span-2">
      <span className="block font-montserrat-bold uppercase">{title}</span>
      {links.map((l) =>
        l.title === "Bangalore, India" ? (
          <div
            key={l.title}
            className="flex items-center break-all gap-1.5 text-white"
          >
            {l.Icon && <l.Icon />}
            {l.title}
          </div>
        ) : (
          <Link
            key={l.title}
            href={l.href}
            className="flex items-center break-all gap-1.5 transition-colors hover:text-indigo-600 hover:underline"
          >
            {l.Icon && <l.Icon />}
            {l.title}
          </Link>
        )
      )}
    </div>
  );
};

export default Footer;
