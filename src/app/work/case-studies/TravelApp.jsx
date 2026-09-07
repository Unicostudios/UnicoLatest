"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const ICON = (name) => `/assets/p786-icons/${name}.svg`;

const COLORS = [
  { name: "SIGNAL LIME", hex: "#E5F35B", fg: "#0b0b0b" },
  { name: "RATING GOLD", hex: "#FFC700", fg: "#0b0b0b" },
  { name: "DEEP", hex: "#060A0C", fg: "#fff" },
  { name: "INK BLUE", hex: "#0D171C", fg: "#fff" },
  { name: "CANVAS", hex: "#F7F7F7", fg: "#0b0b0b", border: true },
];

const FLOWS = [
  ["01", "Activities — browse, detail, booking, guest details"],
  ["02", "Hotel booking and transport selection"],
  ["03", "Currency exchange and mobile recharge"],
  ["04", "Onboarding, auth, profile setup, settings"],
  ["05", "Admin dashboard — bookings, customers, analytics"],
];

const RESULTS = [
  ["4", "taps from open to booked"],
  ["1", "component library, no drift"],
  ["8wk", "flows, UI and system"],
];

function PhoneFrame({ children }) {
  return (
    <div
      style={{
        flex: "0 0 340px",
        height: 700,
        borderRadius: 42,
        overflow: "hidden",
        background: "#F7F7F7",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        border: "8px solid #060A0C",
        scrollSnapAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px 4px", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 600, fontSize: 13, color: "#000" }}>
      <span>9:41</span>
      <span style={{ letterSpacing: "0.1em" }}>▪ ▪ ▮</span>
    </div>
  );
}

function BackHeader({ title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 34, height: 34, borderRadius: 12, background: "#fff", display: "grid", placeItems: "center", fontSize: 15, color: "#000" }}>←</span>
      <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 17, color: "#000" }}>{title}</span>
    </div>
  );
}

function ScreenHome() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div style={{ flex: 1, minHeight: 0, padding: "14px 24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <img decoding="async" src="/assets/opt/p786-avatar.jpg" alt="" style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 500, fontSize: 18, lineHeight: "17px", color: "#000" }}>Hello Sreehari !</div>
              <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 12, lineHeight: "15px", color: "#000", marginTop: 4 }}>Explore the World with Us</div>
            </div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.97)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <img src={ICON("ticket")} alt="" style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.97)", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", fontFamily: "var(--font-manrope), sans-serif", fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
            <img src={ICON("search")} alt="" style={{ width: 18, height: 18, opacity: 0.5, flexShrink: 0 }} />
            Search Your Trip
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#E5F35B", display: "grid", placeItems: "center", color: "#000", flexShrink: 0 }}>
            <img src={ICON("filter")} alt="" style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, height: 150, borderRadius: 24, background: "#fff", padding: "12px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E5F35B", display: "grid", placeItems: "center" }}>
              <img src={ICON("swap")} alt="" style={{ width: 20, height: 20 }} />
            </div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 16, color: "#000" }}>Exchange</div>
            <div style={{ width: "100%", height: 32, borderRadius: 999, background: "#E5F35B", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 600, fontSize: 12, color: "#000" }}>Exchange now</div>
          </div>
          <div style={{ flex: 1, minWidth: 0, height: 150, borderRadius: 24, background: "#fff", padding: "12px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E5F35B", display: "grid", placeItems: "center" }}>
              <img src={ICON("calendar")} alt="" style={{ width: 20, height: 20 }} />
            </div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 16, color: "#000", textAlign: "center" }}>Unlimited Calls</div>
            <div style={{ width: "100%", height: 32, borderRadius: 999, background: "#E5F35B", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 600, fontSize: 12, color: "#000" }}>Recharge</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 18, color: "#000" }}>Popular Trips</div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 12, color: "rgba(0,0,0,0.5)" }}>View All</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { name: "Goa Scuba Diving", src: "/assets/opt/p786-trip-1.jpg" },
            { name: "Himalayan Trek", src: "/assets/opt/p786-trip-2.jpg" },
          ].map((t) => (
            <div key={t.name} style={{ minWidth: 0, borderRadius: 16, background: "#fff", padding: 8 }}>
              <img decoding="async" src={t.src} alt={t.name} style={{ display: "block", width: "100%", height: 96, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 500, fontSize: 14, color: "#000", marginTop: 8 }}>{t.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 13, color: "#000" }}>$777/Person</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-manrope), sans-serif", fontSize: 12, color: "#000" }}>
                  <img src={ICON("star-gold")} alt="" style={{ width: 12, height: 12 }} />
                  4.7
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "12px 0 4px", borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: 17, color: "rgba(0,0,0,0.4)" }}>
          <img src={ICON("home")} alt="" style={{ width: 22, height: 22 }} />
          <img src={ICON("search")} alt="" style={{ width: 22, height: 22, opacity: 0.4 }} />
          <img src={ICON("calendar")} alt="" style={{ width: 22, height: 22, opacity: 0.4 }} />
          <img src={ICON("ticket")} alt="" style={{ width: 22, height: 22, opacity: 0.4 }} />
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenActivityDetail() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div style={{ position: "relative" }}>
        <img decoding="async" src="/assets/opt/p786-sky.jpg" alt="Sky Diving" style={{ display: "block", width: "100%", height: 190, objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 14, top: 14, width: 34, height: 34, borderRadius: 12, background: "rgba(255,255,255,0.9)", display: "grid", placeItems: "center", fontSize: 15, color: "#000" }}>←</div>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 20, color: "#000" }}>Sky Diving</div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, color: "rgba(0,0,0,0.55)", marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
            <img src={ICON("location")} alt="" style={{ width: 13, height: 13 }} />
            Cape Town, South Africa
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontFamily: "var(--font-manrope), sans-serif", fontSize: 11, color: "#000" }}>
          {["Restaurants", "Free WIFI", "Parking"].map((t) => (
            <span key={t} style={{ padding: "6px 11px", borderRadius: 999, background: "#fff" }}>{t}</span>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 15, color: "#000", marginBottom: 6 }}>Overview</div>
          <p style={{ margin: 0, fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, lineHeight: 1.5, color: "rgba(0,0,0,0.6)" }}>
            Jump up your adrenaline, grab your fears by the neck and jump out of an airplane 10,000 feet above sea
            level in this exhilarating skydiving experience.
          </p>
        </div>
        <div style={{ borderRadius: 16, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 13, color: "#000", marginBottom: 8 }}>Available Time Slots</div>
          <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-manrope), sans-serif", fontSize: 12 }}>
            <span style={{ padding: "7px 12px", borderRadius: 999, background: "#E5F35B", color: "#000" }}>09:00</span>
            <span style={{ padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.6)" }}>12:30</span>
            <span style={{ padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.6)" }}>15:00</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>Price</div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 18, color: "#000" }}>$170.00</div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>Per Person</div>
          </div>
          <div style={{ flex: 1, height: 46, borderRadius: 999, background: "#E5F35B", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 14, color: "#000" }}>Book Now</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenCheckout() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div style={{ flex: 1, minHeight: 0, padding: "14px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        <BackHeader title="Summary" />
        <div style={{ display: "flex", gap: 12, borderRadius: 16, background: "#fff", padding: 10 }}>
          <img decoding="async" src="/assets/opt/p786-sky.jpg" alt="Sky Diving" style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 12, flexShrink: 0 }} />
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 15, color: "#000" }}>Sky Diving</div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Cape Town, South Africa</div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 600, fontSize: 13, color: "#000" }}>$377 per person</div>
          </div>
        </div>
        <div style={{ borderRadius: 16, background: "#fff", padding: 14, display: "grid", gap: 10, fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, color: "#000" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(0,0,0,0.55)" }}>Amount Fee</span>
            <span style={{ fontWeight: 600 }}>$377.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(0,0,0,0.55)" }}>Tax Fee</span>
            <span style={{ fontWeight: 600 }}>$50.00</span>
          </div>
          <div style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
            <span style={{ fontWeight: 700 }}>Total Fee</span>
            <span style={{ fontWeight: 700 }}>$427.00</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 14, color: "#000", marginBottom: 8 }}>Payment</div>
          <div style={{ display: "grid", gap: 8, fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, color: "#000" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 12, background: "#fff", padding: 12 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", border: "5px solid #E5F35B", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)" }} />
              Credit / Debit Card
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 12, background: "#fff", padding: 12 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.25)" }} />
              Paypal
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 12, background: "#fff", padding: 12 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.25)" }} />
              Apple pay
            </div>
          </div>
        </div>
        <div style={{ height: 46, borderRadius: 999, background: "#E5F35B", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 14, color: "#000" }}>
          Confirm &amp; Pay
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenBookings() {
  const bookings = [
    { title: "Boat Tour", src: "/assets/opt/p786-trip-1.jpg" },
    { title: "Car Rentals", src: "/assets/opt/p786-trip-3.jpg" },
  ];
  return (
    <PhoneFrame>
      <StatusBar />
      <div style={{ flex: 1, minHeight: 0, padding: "14px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        <BackHeader title="My Bookings" />
        <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-manrope), sans-serif", fontSize: 12 }}>
          <span style={{ padding: "8px 14px", borderRadius: 999, background: "#E5F35B", color: "#000" }}>Upcoming</span>
          <span style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.6)" }}>Completed</span>
          <span style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.6)" }}>Cancelled</span>
        </div>
        {bookings.map((b) => (
          <div key={b.title} style={{ borderRadius: 18, background: "#fff", padding: 10, display: "flex", gap: 12 }}>
            <img decoding="async" src={b.src} alt="" style={{ width: 76, height: 76, objectFit: "cover", borderRadius: 12, flexShrink: 0 }} />
            <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 15, color: "#000" }}>{b.title}</span>
                <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 10, padding: "4px 9px", borderRadius: 999, background: "#E5F35B", color: "#000" }}>Upcoming</span>
              </div>
              <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>$777/Person</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 15, color: "#000" }}>$2500</span>
                <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>View Details</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: 46, borderRadius: 999, background: "#060A0C", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>
          Create Booking
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 0 2px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <img src={ICON("home")} alt="" style={{ width: 22, height: 22, opacity: 0.4 }} />
          <img src={ICON("search")} alt="" style={{ width: 22, height: 22, opacity: 0.4 }} />
          <img src={ICON("calendar")} alt="" style={{ width: 22, height: 22 }} />
          <img src={ICON("ticket")} alt="" style={{ width: 22, height: 22, opacity: 0.4 }} />
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenConfirmation() {
  return (
    <PhoneFrame>
      <StatusBar />
      <div style={{ padding: "30px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", flex: 1 }}>
        <div style={{ width: 86, height: 86, borderRadius: "50%", background: "#E5F35B", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontSize: 38, color: "#060A0C" }}>✓</div>
        <div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 21, color: "#000" }}>Booking Confirmed!</div>
          <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, color: "rgba(0,0,0,0.55)", marginTop: 6 }}>Booking Ref:#DXB2345</div>
        </div>
        <div style={{ width: "100%", borderRadius: 16, background: "#fff", padding: 14, display: "grid", gap: 9, fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, textAlign: "left", color: "#000" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(0,0,0,0.55)" }}>Amount Fee</span>
            <span style={{ fontWeight: 600 }}>$377.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(0,0,0,0.55)" }}>Tax Fee</span>
            <span style={{ fontWeight: 600 }}>$50.00</span>
          </div>
          <div style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
            <span style={{ fontWeight: 700 }}>Total Fee</span>
            <span style={{ fontWeight: 700 }}>$427.00</span>
          </div>
        </div>
        <p style={{ margin: 0, fontFamily: "var(--font-manrope), sans-serif", fontSize: 12, lineHeight: 1.5, color: "rgba(0,0,0,0.55)" }}>
          We have mailed the booking details to you@gmail.com
        </p>
        <div style={{ width: "100%", display: "grid", gap: 9, marginTop: "auto" }}>
          <div style={{ height: 46, borderRadius: 999, background: "#E5F35B", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 14, color: "#000" }}>Download Ticket</div>
          <div style={{ height: 46, borderRadius: 999, border: "1px solid rgba(0,0,0,0.2)", display: "grid", placeItems: "center", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 600, fontSize: 14, color: "#000" }}>View Booking</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function TravelApp() {
  return (
    <div className="u2026">
      <SiteHeader variant="case-study" />

      <section style={{ padding: "clamp(52px, 9vh, 104px) clamp(18px, 4vw, 54px) clamp(30px, 5vh, 56px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 22px",
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "oklch(0.5 0.01 285)",
            }}
          >
            Case study 009 · 786P Travels · Mobile product · 2025
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(38px, 7.4vw, 112px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            A travel app that
            <br />
            is also a <span style={{ color: "var(--ac)" }}>wallet.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              786P Travels books trips, but it also does currency exchange, mobile recharge and transport rental —
              the things you actually need abroad. Search, activities, hotels, booking and checkout, plus an admin
              dashboard and the component library the whole build is assembled from.
            </p>
            <div
              style={{
                display: "grid",
                gap: 14,
                fontFamily: "var(--font-plexmono), monospace",
                fontSize: 11.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(0.5 0.01 285)",
              }}
            >
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Product design · Design system · Mobile</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>8 weeks, 2 designers</div>
                Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            borderRadius: 28,
            background: "radial-gradient(120% 90% at 12% 0%, rgba(229,243,91,0.16), transparent 58%), linear-gradient(#0D171C, #060A0C)",
            padding: "clamp(20px, 4vw, 44px)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: "clamp(18px, 2.6vw, 30px)" }}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E5F35B" }}>Five screens</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)" }}>
              Scroll for more<span aria-hidden="true">→</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(16px, 3vw, 34px)", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingBottom: 6 }}>
            <ScreenHome />
            <ScreenActivityDetail />
            <ScreenCheckout />
            <ScreenBookings />
            <ScreenConfirmation />
          </div>
        </div>
        <div
          style={{
            maxWidth: 1240,
            margin: "12px auto 0",
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "oklch(0.52 0.01 285)",
          }}
        >
          Home · activity detail · checkout · my bookings · confirmation — Creato Display, #E5F35B on #F7F7F7
        </div>
      </section>

      <section style={{ padding: "clamp(44px, 8vh, 92px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(24px, 4vw, 56px)" }}>
          <Reveal style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The problem
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Every new screen was being designed from scratch, so the product drifted: three date pickers, four
              button styles, and a checkout nobody trusted.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Design the flows first and the system alongside them — one date picker, one card, one set of states —
              then hand over a library the engineers build from instead of around.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The work
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <div style={{ minWidth: 0, borderRadius: 20, background: "#0D171C", padding: "clamp(20px, 3vw, 34px)", color: "#fff" }}>
              <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 18 }}>Five flows, one system</div>
              <div style={{ display: "grid", gap: 10, fontFamily: "var(--font-manrope), sans-serif", fontSize: 15, lineHeight: 1.5 }}>
                {FLOWS.map(([n, label]) => (
                  <div key={n} style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "#E5F35B", flexShrink: 0 }}>{n}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ minWidth: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <img decoding="async" src="/assets/opt/p786-trip-3.jpg" alt="786P Travels destination" style={{ display: "block", width: "100%", height: "100%", minHeight: 200, objectFit: "cover", borderRadius: 20 }} />
              <img decoding="async" src="/assets/opt/p786-trip-4.jpg" alt="786P Travels destination" style={{ display: "block", width: "100%", height: "100%", minHeight: 200, objectFit: "cover", borderRadius: 20 }} />
            </div>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 16 }}>
            {COLORS.map((c) => (
              <div
                key={c.name}
                style={{
                  minWidth: 0,
                  height: 96,
                  borderRadius: 16,
                  background: c.hex,
                  color: c.fg,
                  border: c.border ? "1px solid var(--line)" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 12,
                  fontFamily: "var(--font-plexmono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                }}
              >
                <span>{c.name}</span>
                <span style={{ opacity: 0.72 }}>{c.hex}</span>
              </div>
            ))}
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Typeface
              </div>
              <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 10 }}>
                Creato Display
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Medium 16 does most of the work — 823 uses across the file. Regular 12–14 for meta, ExtraBold 36
                for the few real headlines. Manrope carries the admin dashboard.
              </div>
            </div>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                One lime, used sparingly
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "#E5F35B" }} />
                <div style={{ flex: 1, height: 42, borderRadius: 999, background: "#E5F35B" }} />
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#E5F35B" }} />
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Lime never carries text — only the thing you tap. Everything else is black on near-white, so the
                next action is always the brightest object on screen.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, alignItems: "start" }}>
          <Reveal style={{ minWidth: 0 }}>
            <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(24px, 3.4vw, 44px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              The result
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "oklch(0.42 0.01 285)" }}>
              Search that forgives vague input, an itinerary you can edit without losing your place, and a checkout
              that shows the total before it asks for a card.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0, display: "grid", gap: 12 }} delay={0.08}>
            {RESULTS.map(([num, label]) => (
              <div key={label} style={{ padding: 22, borderRadius: 18, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em" }}>{num}</div>
                <div style={{ fontSize: 14.5, color: "oklch(0.46 0.01 285)" }}>{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(20px, 4vh, 40px) clamp(18px, 4vw, 54px) clamp(40px, 7vh, 88px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: "clamp(16px, 2.4vw, 26px)",
            }}
          >
            <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Inside the file
            </h2>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
              Drag to pan · scroll to zoom
            </div>
          </Reveal>
          <Reveal>
            <FileBoard label="786P-TRAVELS.FIG">
              <BoardTile label="Home" src="/assets/opt/p786-trip-1.jpg" style={{ left: 60, top: 90, width: 300 }} imgStyle={{ height: 380 }} />
              <BoardTile label="Activity detail" src="/assets/opt/p786-sky.jpg" style={{ left: 420, top: 90, width: 420 }} imgStyle={{ height: 380 }} />
              <BoardTile label="Checkout" src="/assets/opt/p786-trip-2.jpg" style={{ left: 900, top: 90, width: 300 }} imgStyle={{ height: 380 }} />
              <BoardTile label="Destination" src="/assets/opt/p786-trip-3.jpg" style={{ left: 1260, top: 90, width: 300 }} imgStyle={{ height: 380 }} />
              <BoardTile label="Destination" src="/assets/opt/p786-trip-4.jpg" style={{ left: 1620, top: 90, width: 300 }} imgStyle={{ height: 380 }} />
              <BoardTile label="Avatar" src="/assets/opt/p786-avatar.jpg" style={{ left: 60, top: 540, width: 160 }} imgStyle={{ height: 160 }} />
              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #E5F35B66", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#E5F35B", "#FFC700", "#060A0C", "#0D171C", "#F7F7F7"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Creato Display
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Medium 16 × 823 uses · Manrope on admin
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  19,587 nodes across 3 pages
                  <br />→ 72 checkbox variants. Seventy-two.
                  <br />→ user flow + IA page still has the sticky notes
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="travel-app" />
      <SiteFooter />
    </div>
  );
}
