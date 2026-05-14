'use client';

// PATH: src/app/components/FoldingLogos.jsx
// FIX: Replaced weak generic agency testimonial with
//      3 Niquo-specific quotes. Auto-rotates every 3.5s.
// NOTE: Replace placeholder quotes with real ones when you get them.

import { useEffect, useState } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'I pasted our website URL and Niquo handled a pricing objection better than our actual sales rep. We signed up the same week.',
    name: 'Founder, Haze UAE',
    biz: 'Events & Experiences · Dubai',
    initial: 'H',
  },
  {
    quote:
      'We were losing 60% of our leads to silence. Niquo follows up every single one now. Our conversion jumped in the first week.',
    name: 'Founder, Immersified',
    biz: 'Immersive Experiences · Bangalore',
    initial: 'I',
  },
  {
    quote:
      'It speaks Hindi, handles price questions, and knows our entire service list. Like hiring someone who never sleeps.',
    name: 'Founder, Aashir Kare',
    biz: 'Home Services · Bangalore',
    initial: 'A',
  },
];

export function FoldingLogos() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

        .fl-section {
          background: #050505;
          padding: 80px 24px;
          border-top: 0.5px solid #111;
          border-bottom: 0.5px solid #111;
        }
        .fl-inner {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .fl-label {
          font-size: 11px; font-weight: 300; color: #333;
          letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 40px; font-family: 'DM Sans', sans-serif;
        }
        .fl-quote-wrap {
          min-height: 120px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 36px;
        }
        .fl-quote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 400;
          color: #fff;
          line-height: 1.45;
          letter-spacing: -0.3px;
          transition: opacity 0.4s ease;
        }
        .fl-quote::before { content: '"'; color: #333; margin-right: 2px; }
        .fl-quote::after  { content: '"'; color: #333; margin-left: 2px;  }
        .fl-person {
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .fl-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #22d3ee, #a78bfa);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 600; color: #000;
          font-family: 'DM Sans', sans-serif;
        }
        .fl-name {
          font-size: 14px; font-weight: 500; color: #fff;
          font-family: 'DM Sans', sans-serif;
        }
        .fl-biz {
          font-size: 12px; font-weight: 300; color: #444;
          font-family: 'DM Sans', sans-serif; margin-top: 2px;
        }
        .fl-dots {
          display: flex; gap: 8px; justify-content: center; margin-top: 32px;
        }
        .fl-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #222; cursor: pointer; transition: background 0.2s;
          border: none; padding: 0;
        }
        .fl-dot.active { background: #fff; }
        .fl-niquo-note {
          margin-top: 40px; padding-top: 32px;
          border-top: 0.5px solid #111;
          font-size: 12px; color: #333;
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          letter-spacing: 0.3px;
        }
        .fl-niquo-note a {
          color: #22d3ee; text-decoration: none; font-weight: 400;
        }
        .fl-niquo-note a:hover { opacity: 0.8; }
      `}</style>

      <section className="fl-section">
        <div className="fl-inner">
          <div className="fl-label">What founders say about Niquo</div>

          <div className="fl-quote-wrap">
            <p className="fl-quote" key={active}>{t.quote}</p>
          </div>

          <div className="fl-person">
            <div className="fl-avatar">{t.initial}</div>
            <div>
              <div className="fl-name">{t.name}</div>
              <div className="fl-biz">{t.biz}</div>
            </div>
          </div>

          <div className="fl-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`fl-dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <div className="fl-niquo-note">
            Want to see what Niquo would do for your business?{' '}
            <a href="/niquo">Watch the live demo →</a>
          </div>
        </div>
      </section>
    </>
  );
}
