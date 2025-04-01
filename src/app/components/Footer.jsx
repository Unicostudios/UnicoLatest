import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-white pt-20 rounded-t-[70px] md:rounded-t-[100px]">
      <div className="mx-auto mb-4 text-center text-3xl font-montserrat-bold md:text-5xl">
        Ready to go?
      </div>
      <p className="mx-auto mb-14 text-center max-w-xs xxs2:max-w-sm xs:max-w-md sm:max-w-lg text-sm xxs2:text-base md:text-xl">
        We’re here to take your brand to the next level. Let’s talk about what’s
        possible
      </p>
      <footer className="relative mx-auto max-w-6xl overflow-hidden py-12">
        <div className="md:px4 grid grid-cols-12 gap-x-1.5 gap-y-6 px-2">
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
                href: "#",
              },
              {
                title: "contact@unicostudios.in",
                href: "#",
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
  );
};

const LogoColumn = () => {
  return (
    <div className="col-span-6 md:col-span-4">
      <img src="/assets/unicoblacklogo.svg" alt="Unico" />
      <span className="mt-3 inline-block text-xs">
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
          className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 hover:underline"
        >
          {l.Icon && <l.Icon />}
          {l.title}
        </Link>
      ))}
    </div>
  );
};
