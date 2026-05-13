'use client';

// ─────────────────────────────────────────────────────────────
// PATH:  src/app/components/NiquoHero.jsx
//
// USAGE: In Home.jsx add as the VERY FIRST section:
//
//   import NiquoHero from '@/app/components/NiquoHero'
//
//   export default function Home() {
//     return (
//       <>
//         <NiquoHero />          <-- first thing on the page
//         <FiftyFiftyHero />
//         ... rest of page
//       </>
//     )
//   }
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const DEMO_MESSAGES = [
  { r: 'p', t: 'Hi, looking for a coworking space in Indiranagar' },
  { r: 'n', t: "Hey! We have a great spot there 🙌 Dedicated desk or hot desk?" },
  { r: 'p', t: 'Hot desk, maybe 8 days a month' },
  { r: 'n', t: "Perfect — that's our Day Pass plan at ₹499/day. Want me to check this week's availability?" },
  { r: 'p', t: 'Yes please!' },
  { r: 'n', t: "On it! I've found 3 open slots this week. Shall I reserve one for you? 📅" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function MiniChat() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      await sleep(900);
      for (const m of DEMO_MESSAGES) {
        if (cancelled) break;
        setTyping(true);
        await sleep(m.r === 'p' ? 750 : 1200);
        if (cancelled) break;
        setTyping(false);
        setMessages((prev) => [...prev, m]);
        await sleep(m.r === 'p' ? 320 : 520);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages, typing]);

  return (
    <>
      <style>{`
        @keyframes nh-msgpop {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nh-tyb {
          0%, 70%, 100% { transform: translateY(0); }
          35%            { transform: translateY(-4px); }
        }
        .nh-ty {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(245,245,247,0.45);
          animation: nh-tyb 1.1s infinite;
        }
        .nh-ty:nth-child(2) { animation-delay: 0.18s; }
        .nh-ty:nth-child(3) { animation-delay: 0.36s; }
        .nh-chat-wrap::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        background: '#0a0a0a',
        border: '0.5px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '360px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{
          background: '#111',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '0.5px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0,
          }}>B</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#f5f5f7', lineHeight: 1.3 }}>
              Bhive Workspace
            </div>
            <div style={{ fontSize: '11px', color: '#30d158' }}>● Niquo is online</div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={ref}
          className="nh-chat-wrap"
          style={{
            padding: '14px 12px',
            height: '200px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.r === 'p' ? 'flex-start' : 'flex-end',
                background: m.r === 'p' ? '#1c1c1e' : '#0b5d2e',
                color: '#f5f5f7',
                padding: '8px 11px',
                borderRadius: m.r === 'p' ? '4px 11px 11px 11px' : '11px 11px 4px 11px',
                fontSize: '12px',
                lineHeight: 1.45,
                maxWidth: '82%',
                animation: 'nh-msgpop 0.25s ease both',
              }}
            >
              {m.t}
            </div>
          ))}
          {typing && (
            <div style={{
              alignSelf: 'flex-end',
              background: '#0b5d2e',
              padding: '8px 12px',
              borderRadius: '11px 11px 4px 11px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}>
              <div className="nh-ty" />
              <div className="nh-ty" />
              <div className="nh-ty" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function NiquoHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');

        @keyframes niquo-hero-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #30d158; }
          50%       { opacity: 0.3; box-shadow: 0 0 2px #30d158; }
        }

        .nh-section {
          background: #000;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 110px 24px 90px;
          position: relative;
          overflow: hidden;
        }
        .nh-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(48,209,88,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .nh-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #6e6e73;
          letter-spacing: -0.1px;
          margin-bottom: 16px;
        }
        .nh-glow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 8px #30d158;
          display: inline-block;
          animation: niquo-hero-glow 2s infinite;
        }
        .nh-h1 {
          font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          font-size: clamp(46px, 7.5vw, 92px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.04;
          color: #f5f5f7;
          margin-bottom: 16px;
          max-width: 800px;
        }
        .nh-h1-grad {
          background: linear-gradient(135deg, #f5f5f7 0%, #6e6e73 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nh-sub {
          font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 300;
          color: #6e6e73;
          max-width: 560px;
          line-height: 1.5;
          letter-spacing: -0.02em;
          margin-bottom: 44px;
        }
        .nh-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 72px;
        }
        .nh-btn-primary {
          background: #0071e3;
          color: #fff;
          font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          font-size: 17px;
          font-weight: 400;
          padding: 13px 28px;
          border-radius: 980px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          letter-spacing: -0.01em;
          display: inline-block;
        }
        .nh-btn-primary:hover { background: #0077ed; }
        .nh-btn-link {
          font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          font-size: 17px;
          font-weight: 400;
          color: #2997ff;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: opacity 0.2s;
        }
        .nh-btn-link:hover { opacity: 0.8; }
        .nh-caption {
          margin-top: 20px;
          font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          font-size: 11px;
          color: #6e6e73;
          letter-spacing: 0.3px;
        }
      `}</style>

      <section className="nh-section" id="top">
        <div className="nh-eyebrow">
          <span className="nh-glow-dot" />
          Introducing Niquo
        </div>

        <h1 className="nh-h1">
          Your AI sales rep.<br />
          <span className="nh-h1-grad">Always on.</span>
        </h1>

        <p className="nh-sub">
          Niquo reads any business in 60 seconds and becomes its salesperson — handling every lead on WhatsApp, chat, and calls.
        </p>

        <div className="nh-actions">
          <Link href="/niquo" className="nh-btn-primary">
            Watch Niquo sell your business
          </Link>
          <Link href="/niquo#demo" className="nh-btn-link">
            See the demo ›
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <MiniChat />
          <p className="nh-caption">
            Niquo acting as Bhive Workspace's sales agent, live
          </p>
        </div>
      </section>
    </>
  );
}
