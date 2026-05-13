'use client';

// ─────────────────────────────────────────────────────────────
// PATH:  src/app/components/NiquoSection.jsx
//
// USAGE: In Home.jsx, import and place AFTER your existing hero
//        and BEFORE FoldingLogos / FeatureToggles:
//
//   import NiquoSection from '@/app/components/NiquoSection'
//
//   export default function Home() {
//     return (
//       <>
//         <NiquoHero />
//         <FiftyFiftyHero />
//         <NiquoSection />      <-- drop it here
//         <FeatureToggles />
//         <FoldingLogos />
//         ...
//       </>
//     )
//   }
// ─────────────────────────────────────────────────────────────

import Link from 'next/link';

const STATS = [
  { n: '60s',  l: 'URL to first result'  },
  { n: '24/7', l: 'Never misses a lead'  },
  { n: '12+',  l: 'Industries active'    },
];

const CHAT_BUBBLES = [
  { r: 'p', t: 'Hi, interested in your service' },
  { r: 'n', t: "Hey! Great timing. What's your main goal right now?" },
  { r: 'p', t: 'Looking for something fast' },
  { r: 'n', t: "Perfect — we can get you started today. Here's what I'd recommend 👇" },
];

export default function NiquoSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');

        @keyframes ns-pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes ns-tyb    { 0%,70%,100%{transform:translateY(0)} 35%{transform:translateY(-4px)} }

        .ns-ty {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(245,245,247,0.45);
          animation: ns-tyb 1.1s infinite;
        }
        .ns-ty:nth-child(2) { animation-delay: 0.18s; }
        .ns-ty:nth-child(3) { animation-delay: 0.36s; }

        .ns-section {
          background: #000;
          padding: 120px 24px;
          overflow: hidden;
          position: relative;
        }
        .ns-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(48,209,88,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .ns-inner {
          max-width: 1020px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .ns-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(48,209,88,0.08);
          border: 0.5px solid rgba(48,209,88,0.2);
          color: #30d158;
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .ns-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #30d158;
          animation: ns-pulse 2s infinite;
        }
        .ns-h2 {
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: clamp(38px, 4.5vw, 64px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #f5f5f7;
          margin-bottom: 18px;
        }
        .ns-body {
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 300;
          color: #6e6e73;
          line-height: 1.55;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          max-width: 420px;
        }
        .ns-body2 {
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #6e6e73;
          line-height: 1.65;
          letter-spacing: -0.01em;
          margin-bottom: 40px;
          max-width: 400px;
        }
        .ns-stats {
          display: flex;
          gap: 36px;
          padding-top: 28px;
          border-top: 0.5px solid rgba(245,245,247,0.08);
          margin-bottom: 40px;
        }
        .ns-stat-n {
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #f5f5f7;
          line-height: 1;
          margin-bottom: 4px;
          display: block;
        }
        .ns-stat-l {
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #6e6e73;
          letter-spacing: -0.01em;
          display: block;
        }
        .ns-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .ns-btn-primary {
          background: #0071e3;
          color: #fff;
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: 15px;
          font-weight: 400;
          padding: 11px 24px;
          border-radius: 980px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          letter-spacing: -0.01em;
          display: inline-block;
        }
        .ns-btn-primary:hover { background: #0077ed; }
        .ns-btn-link {
          font-family: -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #2997ff;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: opacity 0.2s;
        }
        .ns-btn-link:hover { opacity: 0.8; }

        /* Phone */
        .ns-phone-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .ns-phone-glow {
          position: absolute;
          width: 280px; height: 280px;
          background: radial-gradient(ellipse, rgba(48,209,88,0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .ns-phone {
          width: 256px;
          height: 510px;
          background: linear-gradient(160deg, #1c1c1e 0%, #0a0a0a 100%);
          border-radius: 44px;
          border: 1.5px solid rgba(255,255,255,0.12);
          box-shadow: 0 60px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05);
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }
        .ns-notch {
          width: 88px; height: 24px;
          background: #000;
          border-radius: 0 0 16px 16px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .ns-screen {
          padding: 6px 14px 16px;
          height: calc(100% - 24px);
          display: flex;
          flex-direction: column;
        }
        .ns-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding: 2px 4px;
        }
        .ns-time {
          font-size: 12px;
          font-weight: 600;
          color: #f5f5f7;
        }
        .ns-bars {
          display: flex;
          gap: 3px;
          align-items: flex-end;
        }
        .ns-bar {
          width: 3px;
          border-radius: 1px;
          background: #f5f5f7;
        }
        .ns-wa-head {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 10px;
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
          margin-bottom: 12px;
        }
        .ns-wa-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25d366, #128c7e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }
        .ns-wa-name {
          font-size: 12px;
          font-weight: 500;
          color: #f5f5f7;
          line-height: 1.2;
        }
        .ns-wa-status {
          font-size: 10px;
          color: #25d366;
        }
        .ns-bubbles {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 7px;
          justify-content: flex-end;
          overflow: hidden;
        }
        .ns-bubble-p {
          align-self: flex-start;
          background: #1c1c1e;
          color: #f5f5f7;
          padding: 7px 10px;
          border-radius: 4px 10px 10px 10px;
          font-size: 11px;
          line-height: 1.45;
          max-width: 80%;
        }
        .ns-bubble-n {
          align-self: flex-end;
          background: #0b5d2e;
          color: #f5f5f7;
          padding: 7px 10px;
          border-radius: 10px 10px 4px 10px;
          font-size: 11px;
          line-height: 1.45;
          max-width: 80%;
        }
        .ns-typing {
          align-self: flex-end;
          background: #0b5d2e;
          padding: 8px 12px;
          border-radius: 10px 10px 4px 10px;
          display: flex;
          gap: 3px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .ns-inner { grid-template-columns: 1fr !important; gap: 56px !important; }
          .ns-phone-wrap { display: none !important; }
          .ns-section { padding: 80px 20px; }
        }
      `}</style>

      <section className="ns-section">
        <div className="ns-inner">

          {/* LEFT */}
          <div>
            <div className="ns-badge">
              <span className="ns-badge-dot" />
              New · AI Sales Agent
            </div>

            <h2 className="ns-h2">Meet Niquo.</h2>

            <p className="ns-body">
              The AI that reads your business, learns your pitch, and closes leads on WhatsApp, chat, and calls — 24/7.
            </p>

            <p className="ns-body2">
              Not a chatbot. Not an FAQ bot. A closer — that handles price objections, follows up ghosts, and qualifies every lead before it reaches you.
            </p>

            <div className="ns-stats">
              {STATS.map((s) => (
                <div key={s.n}>
                  <span className="ns-stat-n">{s.n}</span>
                  <span className="ns-stat-l">{s.l}</span>
                </div>
              ))}
            </div>

            <div className="ns-actions">
              <Link href="/niquo" className="ns-btn-primary">
                Watch Niquo sell your business
              </Link>
              <Link href="/niquo#demo" className="ns-btn-link">
                Try the demo ›
              </Link>
            </div>
          </div>

          {/* RIGHT — phone */}
          <div className="ns-phone-wrap">
            <div className="ns-phone-glow" />
            <div className="ns-phone">
              <div className="ns-notch" />
              <div className="ns-screen">
                <div className="ns-status">
                  <span className="ns-time">9:41</span>
                  <div className="ns-bars">
                    {[6, 9, 12, 9].map((h, i) => (
                      <div key={i} className="ns-bar" style={{ height: `${h}px` }} />
                    ))}
                  </div>
                </div>

                <div className="ns-wa-head">
                  <div className="ns-wa-avatar">N</div>
                  <div>
                    <div className="ns-wa-name">Your Business</div>
                    <div className="ns-wa-status">● Powered by Niquo</div>
                  </div>
                </div>

                <div className="ns-bubbles">
                  {CHAT_BUBBLES.map((m, i) => (
                    <div
                      key={i}
                      className={m.r === 'p' ? 'ns-bubble-p' : 'ns-bubble-n'}
                    >
                      {m.t}
                    </div>
                  ))}
                  <div className="ns-typing">
                    <div className="ns-ty" />
                    <div className="ns-ty" />
                    <div className="ns-ty" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
