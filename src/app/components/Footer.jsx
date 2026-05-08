import React from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiWhatsapp } from "react-icons/si";
import Link from "next/link";

export const Footer = ({ theme }) => {
  return (
    <div>
      <div
        className={`${
          theme
            ? "bg-black text-white"
            : "bg-white rounded-t-[50px] md:rounded-t-[70px]"
        }`}
      >
        <footer className="relative mx-auto max-w-6xl overflow-hidden py-12">
          <div className="pl-10 sm:pl-0 grid grid-cols-1 xxs:grid-cols-12 gap-x-1.5 gap-y-6 sm:gap-0 sm:flex justify-around">
            <LogoColumn theme={theme} />
            <GenericColumn
              title="Company"
              links={[
                { title: "Home", href: "/" },
                { title: "About Us", href: "/#about" },
                { title: "Services", href: "/#services" },
                { title: "AI Tools", href: "/tools" },
                { title: "Book a Call", href: "https://calendly.com/unicostudioss/30min" },
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
                {
                  title: "WhatsApp",
                  href: "https://wa.me/918147057109?text=Hi%20Saurav%2C%20I%20saw%20Unico%20Studios%20and%20want%20to%20know%20more",
                  Icon: SiWhatsapp,
                },
              ]}
            />
            <GenericColumn
              title="Contact"
              links={[
                {
                  title: "WhatsApp: +91 81470 57109",
                  href: "https://wa.me/918147057109?text=Hi%20Saurav%2C%20I%20saw%20Unico%20Studios%20and%20want%20to%20know%20more",
                  Icon: SiWhatsapp,
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

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 px-10 sm:px-0 text-xs text-neutral-400">
            <span>© 2026 Unico Studios. All Rights Reserved.</span>
            <span>India's First AI-Powered Growth Agency</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

const LogoColumn = ({ theme }) => {
  return (
    <div className="col-span-6 md:col-span-4">
      <div>
        <img
          src={
            theme
              ? "/assets/unicologo-white.png"
              : "/assets/unicologo-black.png"
          }
          alt="Unico Studios"
          className="h-6 xs:h-8 md:h-10 md:w-auto"
        />
      </div>
      <p className="mt-3 inline-block text-[10px] xxs2:text-xs pr-5 leading-relaxed">
        India's First AI-Powered<br />Growth Agency.<br />
        Built in Bangalore.
      </p>

      {/* WhatsApp CTA in footer */}
      <a
        href="https://wa.me/918147057109?text=Hi%20Saurav%2C%20I%20saw%20Unico%20Studios%20and%20want%20to%20know%20more"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 12,
          padding: "6px 14px",
          background: "#25D366",
          borderRadius: 100,
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "0.03em",
        }}
      >
        <SiWhatsapp size={12} />
        Chat with us
      </a>
    </div>
  );
};

const GenericColumn = ({ title, links }) => {
  return (
    <div className="col-span-6 space-y-2 text-xs xxs2:text-sm md:col-span-2">
      <span className="block font-montserrat-bold uppercase">{title}</span>
      {links.map((l) =>
        l.title === "Bangalore, India" ? (
          <div key={l.title} className="flex items-center break-all gap-1.5">
            {l.Icon && <l.Icon />}
            {l.title}
          </div>
        ) : (
          <Link
            key={l.title}
            href={l.href}
            className="flex items-center break-all gap-1.5 transition-colors hover:text-indigo-600 hover:underline" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}
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
