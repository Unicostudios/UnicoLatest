'use client';

// ─────────────────────────────────────────────────────────────
// PATH: src/app/niquo/page.jsx
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseSimulation(reply) {
  const lines = reply.split('\n');
  const msgs = [];
  let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('PROSPECT:')) {
      if (cur) msgs.push(cur);
      cur = { r: 'p', t: t.replace('PROSPECT:', '').trim() };
    } else if (t.startsWith('NIQUO:')) {
      if (cur) msgs.push(cur);
      cur = { r: 'n', t: t.replace('NIQUO:', '').trim() };
    } else if (t === 'END_SIMULATION') {
      break;
    } else if (cur && t) {
      cur.t += ' ' + t;
    }
  }
  if (cur) msgs.push(cur);
  return msgs;
}

// ─────────────────────────────────────────────────────────────
// NEURAL CANVAS HOOK
// ─────────────────────────────────────────────────────────────
function useNeuralCanvas(canvasRef, heroRef) {
  const mouseRef = useRef({ x: -999, y: -999 });
  const ptsRef   = useRef([]);
  const rafRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero   = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      buildPts();
    }
    function buildPts() {
      const W = canvas.width, H = canvas.height;
      const count = Math.floor((W * H) / 14000);
      ptsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.1,
        ba: 0.07 + Math.random() * 0.16,
      }));
    }
    function draw() {
      const W = canvas.width, H = canvas.height;
      const pts = ptsRef.current;
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dm   = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const glow = dm < 120 ? (1 - dm / 120) * 0.4 : 0;
        const alpha = Math.min(1, p.ba + glow);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,245,247,${alpha.toFixed(3)})`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(245,245,247,${((1 - d / 100) * 0.045).toFixed(3)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    hero.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    hero.addEventListener('mouseleave', () => {
      mouseRef.current = { x: -999, y: -999 };
    });

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, heroRef]);
}

// ─────────────────────────────────────────────────────────────
// DEMO FEED — connected to real /api/chat
// ─────────────────────────────────────────────────────────────
const SCENARIO_TRIGGERS = {
  Skeptic:    'SIMULATE_SCENARIO SKEPTIC',
  Angry:      'SIMULATE_SCENARIO ANGRY',
  Price:      'SIMULATE_SCENARIO PRICE',
  Competitor: 'SIMULATE_SCENARIO COMPETITOR',
  Almost:     'SIMULATE_SCENARIO ALMOST',
  Ghost:      'SIMULATE_SCENARIO GHOSTER',
};

function DemoFeed() {
  const [messages,     setMessages]     = useState([]);
  const [isRunning,    setIsRunning]     = useState(false);
  const [typing,       setTyping]        = useState(false);
  const [url,          setUrl]           = useState('');
  const [error,        setError]         = useState('');
  const [confirmedUrl, setConfirmedUrl]  = useState(null);
  const feedRef    = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages, typing]);

  async function streamMsgs(msgs) {
    for (const m of msgs) {
      const isP = m.r === 'p';
      setTyping(true);
      await sleep(isP ? 850 : 1400);
      setTyping(false);
      setMessages((prev) => [...prev, { role: m.r, text: '', partial: true }]);
      const words = m.t.split(' ');
      for (const w of words) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: m.r,
            text: copy[copy.length - 1].text + (copy[copy.length - 1].text ? ' ' : '') + w,
            partial: true,
          };
          return copy;
        });
        if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
        await sleep(isP ? 46 : 64);
      }
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { ...copy[copy.length - 1], partial: false };
        return copy;
      });
      await sleep(isP ? 360 : 520);
    }
  }

  async function callApi(message, urlToUse) {
    if (isRunning) return;
    setIsRunning(true);
    setError('');
    setMessages([]);
    setTyping(false);

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history:        historyRef.current,
          mode:           'niquo',
          email:          'demo@niquo.ai',
          uploadedContent: null,
          confirmedUrl:   urlToUse || null,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data   = await res.json();
      const reply  = data.reply || '';
      const parsed = parseSimulation(reply);
      await streamMsgs(parsed.length ? parsed : [{ r: 'n', t: reply }]);
      historyRef.current = [
        ...historyRef.current,
        { role: 'user',      content: message },
        { role: 'assistant', content: reply   },
      ];
    } catch {
      setError('Something went wrong. Check your connection and try again.');
    } finally {
      setIsRunning(false);
      setTyping(false);
    }
  }

  function handleRun() {
    if (!url.trim()) { setError('Enter your website URL or company name first.'); return; }
    setError('');
    let clean = url.trim();
    if (!clean.startsWith('http')) clean = 'https://' + clean;
    setConfirmedUrl(clean);
    historyRef.current = [];
    callApi(clean, clean);
  }

  function handleScenario(key) {
    if (!confirmedUrl) { setError('Run the main demo first so Niquo knows your business.'); return; }
    setError('');
    callApi(SCENARIO_TRIGGERS[key], confirmedUrl);
  }

  return (
    <div className="np-demo-shell">
      {/* Chrome bar */}
      <div className="np-demo-chrome">
        <div className="np-dc-dots">
          <div className="np-dc-dot np-d1" />
          <div className="np-dc-dot np-d2" />
          <div className="np-dc-dot np-d3" />
        </div>
        <div className="np-dc-url">
          {confirmedUrl || 'unicostudios.in/niquo — live demo'}
        </div>
      </div>

      {/* Split */}
      <div className="np-demo-split">
        {/* Controls */}
        <div className="np-demo-ctrl">
          <div>
            <span className="np-ctrl-lbl">your business</span>
            <input
              className="np-ctrl-inp"
              type="text"
              placeholder="yourwebsite.com"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleRun()}
            />
          </div>
          {error && <p className="np-derr">{error}</p>}
          <button
            className="np-ctrl-run"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? 'Niquo is thinking…' : 'Run simulation'}
          </button>
          <div className="np-ctrl-div">scenarios</div>
          <div className="np-scen-list">
            {Object.keys(SCENARIO_TRIGGERS).map((key) => (
              <button
                key={key}
                className="np-scen-btn"
                onClick={() => handleScenario(key)}
                disabled={isRunning}
              >
                {key === 'Skeptic'    && 'The Skeptic'}
                {key === 'Angry'      && 'The Angry Lead'}
                {key === 'Price'      && 'Price Objection'}
                {key === 'Competitor' && 'Competitor Battle'}
                {key === 'Almost'     && 'Almost Closed'}
                {key === 'Ghost'      && 'The Ghost'}
              </button>
            ))}
          </div>
          {confirmedUrl && (
            <p className="np-cbiz">
              Niquo is selling for<br />
              <span>{confirmedUrl}</span>
            </p>
          )}
        </div>

        {/* Feed */}
        <div className="np-demo-feed" ref={feedRef}>
          {messages.length === 0 && !typing && !isRunning && (
            <div className="np-feed-empty">
              Paste your business URL above.<br />
              Watch Niquo become your salesperson.
            </div>
          )}
          {isRunning && messages.length === 0 && (
            <div className="np-feed-loading">
              <div className="np-trow">
                <div className="np-ty" /><div className="np-ty" /><div className="np-ty" />
              </div>
              <span>Reading your business…</span>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className="np-msg-grp">
              <div className={`np-msg-who ${m.role}`}>
                {m.role === 'p' ? 'PROSPECT' : 'NIQUO'}
              </div>
              <div className={`np-msg-bub ${m.role}`}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="np-trow">
              <div className="np-ty" /><div className="np-ty" /><div className="np-ty" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function NiquoPage() {
  const canvasRef = useRef(null);
  const heroRef   = useRef(null);
  useNeuralCanvas(canvasRef, heroRef);

  const TICKER_ITEMS = [
    'WhatsApp','HubSpot','Salesforce','Calendly','Slack',
    'Zoom','Google Ads','Meta Ads','Interakt','Wati','Yellow.ai',
  ];

  const FEATURES = [
    {
      color: '#2997ff',
      svg: <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#2997ff" strokeWidth="1.5"/><path d="M16 24h16M24 16v16" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'Reads any business in 60s',
      desc:  'Paste a URL. Niquo learns your product, pricing, and pitch — and deploys as your best rep, instantly.',
    },
    {
      color: '#30d158',
      svg: <svg viewBox="0 0 48 48" fill="none"><path d="M8 24c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round"/><path d="M24 32l-6-4 6-4 6 4-6 4z" stroke="#30d158" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      title: 'Handles every objection',
      desc:  'Price, skeptics, competitors, ghosts — calibrated responses for every scenario, specific to your business.',
    },
    {
      color: '#ff9f0a',
      svg: <svg viewBox="0 0 48 48" fill="none"><path d="M24 8v8M24 32v8M8 24h8M32 24h8" stroke="#ff9f0a" strokeWidth="1.5" strokeLinecap="round"/><circle cx="24" cy="24" r="6" stroke="#ff9f0a" strokeWidth="1.5"/></svg>,
      title: 'Multilingual by default',
      desc:  'Hindi, Tamil, Kannada, Hinglish — Niquo mirrors the exact language and tone your lead uses.',
    },
    {
      color: '#bf5af2',
      svg: <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="32" height="20" rx="4" stroke="#bf5af2" strokeWidth="1.5"/><path d="M16 28l4-4 4 4 4-8 4 8" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title: 'WhatsApp · Chat · Calls',
      desc:  'One Niquo, every channel. Conversations sync to your CRM automatically.',
    },
    {
      color: '#ff375f',
      svg: <svg viewBox="0 0 48 48" fill="none"><path d="M24 8c8.837 0 16 7.163 16 16s-7.163 16-16 16S8 32.837 8 24" stroke="#ff375f" strokeWidth="1.5" strokeLinecap="round"/><path d="M24 16v8l6 4" stroke="#ff375f" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'Auto follow-up',
      desc:  'No more cold leads going silent. Niquo follows up every ghost at exactly the right time.',
    },
    {
      color: '#64d2ff',
      svg: <svg viewBox="0 0 48 48" fill="none"><path d="M12 36V20M20 36V12M28 36V24M36 36V16" stroke="#64d2ff" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'CRM + calendar sync',
      desc:  'Hot leads logged, meetings booked, pipeline always fresh — zero manual work from your team.',
    },
  ];

  const HOW_STEPS = [
    { n: '01', t: 'Share your URL',        d: 'Niquo reads your site — product, pricing, tone — and builds your agent from scratch.' },
    { n: '02', t: 'We configure',          d: 'Objection playbooks, qualification rules, follow-up cadences — all tuned to your business.' },
    { n: '03', t: 'Go live',               d: 'Niquo deploys on WhatsApp, chat, or calls. No long contracts, no engineering needed.' },
    { n: '04', t: 'You only close',        d: 'Hot leads land in your CRM. Your team talks only to people ready to buy.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:   #000;
          --bg2:  #0a0a0a;
          --bg3:  #111;
          --bg4:  #1a1a1a;
          --ow:   #f5f5f7;
          --m1:   rgba(245,245,247,0.56);
          --m2:   rgba(245,245,247,0.28);
          --m3:   rgba(245,245,247,0.1);
          --m4:   rgba(245,245,247,0.05);
          --b1:   rgba(245,245,247,0.1);
          --b2:   rgba(245,245,247,0.18);
          --brand:'Comfortaa',sans-serif;
          --sf:   -apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--ow);
          font-family: var(--sf);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .np-nav {
          height: 52px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 44px;
          background: rgba(0,0,0,0.8);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 0.5px solid var(--b1);
          position: sticky; top: 0; z-index: 100;
        }
        .np-logo {
          font-family: var(--brand);
          font-size: 18px; font-weight: 300;
          color: var(--ow); letter-spacing: 2px; text-decoration: none;
        }
        .np-nav-links { display: flex; gap: 28px; list-style: none; align-items: center; }
        .np-nav-links a {
          font-size: 12px; color: var(--m1); text-decoration: none;
          transition: color .2s; letter-spacing: .2px;
        }
        .np-nav-links a:hover { color: var(--ow); }
        .np-nav-cta {
          font-size: 12px; color: var(--ow);
          background: rgba(255,255,255,0.1);
          border: 0.5px solid var(--b2);
          padding: 6px 16px; border-radius: 20px;
          cursor: pointer; text-decoration: none; transition: background .2s;
        }
        .np-nav-cta:hover { background: rgba(255,255,255,0.18); }
        .np-nav-back {
          font-size: 12px; color: var(--m2); text-decoration: none;
          display: flex; align-items: center; gap: 4px; transition: color .2s;
        }
        .np-nav-back:hover { color: var(--m1); }

        /* ── HERO ── */
        .np-hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 80px 44px 60px;
          overflow: hidden; background: var(--bg);
        }
        .np-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(80,80,120,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .np-hero canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
        .np-hero-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 200px;
          background: linear-gradient(transparent, var(--bg));
          pointer-events: none; z-index: 1;
        }
        .np-hero-content { position: relative; z-index: 2; }
        .np-hero-ey {
          font-size: 17px; font-weight: 400; color: #6e6e73;
          letter-spacing: -.2px; margin-bottom: 10px;
        }
        .np-hero-h1 {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 700; letter-spacing: -.03em; line-height: 1.05;
          color: var(--ow); margin-bottom: 10px;
        }
        .np-hero-h1 .np-grad {
          background: linear-gradient(135deg, #f5f5f7 0%, #8a8a8e 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .np-hero-sub {
          font-size: clamp(19px, 2.5vw, 28px); font-weight: 300;
          color: #6e6e73; letter-spacing: -.02em; line-height: 1.4;
          margin-bottom: 40px; max-width: 620px;
        }
        .np-hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .np-btn-blue {
          background: #0071e3; color: #fff;
          font-size: 17px; font-weight: 400;
          padding: 12px 26px; border-radius: 980px;
          border: none; cursor: pointer; text-decoration: none;
          transition: background .2s; display: inline-block; letter-spacing: -.01em;
        }
        .np-btn-blue:hover { background: #0077ed; }
        .np-btn-link {
          font-size: 17px; font-weight: 400; color: #2997ff;
          text-decoration: none; display: inline-flex;
          align-items: center; gap: 4px; transition: opacity .2s; letter-spacing: -.01em;
        }
        .np-btn-link:hover { opacity: .8; }

        /* Phone in hero */
        .np-phone-wrap { margin-top: 72px; position: relative; display: inline-block; }
        .np-phone {
          width: 280px; height: 560px;
          background: linear-gradient(160deg,#1c1c1e 0%,#0a0a0a 100%);
          border-radius: 46px;
          border: 1.5px solid rgba(255,255,255,0.15);
          box-shadow: 0 60px 120px rgba(0,0,0,0.8),
                      0 0 0 .5px rgba(255,255,255,0.05),
                      inset 0 0 0 1px rgba(255,255,255,0.08);
          overflow: hidden; position: relative;
        }
        .np-notch {
          width: 100px; height: 28px; background: #000;
          border-radius: 0 0 20px 20px; margin: 0 auto; position: relative; z-index: 2;
        }
        .np-phone-screen {
          position: absolute; inset: 0;
          padding: 36px 16px 20px;
          display: flex; flex-direction: column;
        }
        .np-ps-status { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 0 4px; }
        .np-ps-time { font-size: 13px; font-weight: 600; color: var(--ow); }
        .np-ps-bars { display: flex; gap: 5px; align-items: flex-end; }
        .np-ps-bar  { width: 3px; border-radius: 1px; background: var(--ow); }
        .np-wa-hdr  {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 0; border-bottom: .5px solid rgba(255,255,255,0.08); margin-bottom: 16px;
        }
        .np-wa-av {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg,#25d366,#128c7e);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600; color: #fff; flex-shrink: 0;
        }
        .np-wa-name   { font-size: 14px; font-weight: 500; color: var(--ow); }
        .np-wa-status { font-size: 11px; color: #25d366; }
        .np-chat-area { flex: 1; overflow: hidden; display: flex; flex-direction: column; gap: 8px; justify-content: flex-end; }
        .np-chat-them {
          background: #1c1c1e; color: var(--ow);
          padding: 8px 12px; border-radius: 4px 12px 12px 12px;
          font-size: 12px; line-height: 1.45; align-self: flex-start; max-width: 80%;
        }
        .np-chat-us {
          background: #0b5d2e; color: var(--ow);
          padding: 8px 12px; border-radius: 12px 12px 4px 12px;
          font-size: 12px; line-height: 1.45; align-self: flex-end; max-width: 80%;
        }
        .np-chat-time { font-size: 9px; color: rgba(245,245,247,.35); margin-top: 2px; text-align: right; }
        .np-phone-glow {
          position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 200px;
          background: radial-gradient(ellipse,rgba(37,211,102,.15) 0%,transparent 70%);
          pointer-events: none;
        }

        /* ── TICKER ── */
        .np-ticker {
          border-top: .5px solid var(--b1); border-bottom: .5px solid var(--b1);
          padding: 13px 0; overflow: hidden; background: var(--bg2);
        }
        .np-ticker-track {
          display: flex; gap: 60px; align-items: center;
          animation: nptick 28s linear infinite; width: max-content;
        }
        @keyframes nptick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .np-ticker-item {
          font-size: 11px; font-weight: 300; color: var(--m2);
          letter-spacing: 2.2px; text-transform: uppercase; white-space: nowrap;
        }
        .np-ticker-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--m2); flex-shrink: 0; }

        /* ── SECTION BASE ── */
        .np-section {
          padding: 120px 44px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; position: relative; overflow: hidden;
        }

        /* ── TAGLINE ── */
        .np-tag-ey   { font-size: 14px; font-weight: 400; color: #6e6e73; margin-bottom: 12px; letter-spacing: -.1px; }
        .np-tag-h    { font-size: clamp(40px,6vw,80px); font-weight: 700; letter-spacing: -.04em; line-height: 1.05; color: var(--ow); max-width: 800px; }
        .np-tag-h em { font-style: normal; color: #6e6e73; }
        .np-tag-sub  { font-size: clamp(17px,2vw,24px); font-weight: 300; color: #6e6e73; max-width: 560px; margin-top: 16px; line-height: 1.5; letter-spacing: -.01em; }

        /* ── FEATURES ── */
        .np-feat-h {
          font-size: clamp(32px,5vw,64px); font-weight: 700;
          letter-spacing: -.04em; line-height: 1.05; color: var(--ow); margin-bottom: 80px;
        }
        .np-feat-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1px;
          background: var(--b1); border-radius: 18px; overflow: hidden;
          max-width: 960px; width: 100%; border: .5px solid var(--b1);
        }
        .np-feat-card {
          background: var(--bg3); padding: 40px 36px;
          text-align: left; transition: background .25s;
        }
        .np-feat-card:hover { background: var(--bg4); }
        .np-feat-icon { width: 48px; height: 48px; margin-bottom: 20px; }
        .np-feat-icon svg { width: 100%; height: 100%; }
        .np-feat-title { font-size: 19px; font-weight: 600; color: var(--ow); letter-spacing: -.02em; margin-bottom: 8px; line-height: 1.2; }
        .np-feat-desc  { font-size: 14px; font-weight: 300; color: #6e6e73; line-height: 1.6; letter-spacing: -.01em; }

        /* ── DEMO ── */
        .np-demo-h   { font-size: clamp(36px,5vw,64px); font-weight: 700; letter-spacing: -.04em; line-height: 1.05; color: var(--ow); margin-bottom: 12px; }
        .np-demo-sub { font-size: 17px; font-weight: 300; color: #6e6e73; max-width: 540px; margin: 0 auto 60px; line-height: 1.55; letter-spacing: -.01em; }

        .np-demo-shell {
          max-width: 900px; margin: 0 auto;
          background: var(--bg2); border: .5px solid var(--b1);
          border-radius: 18px; overflow: hidden; text-align: left;
        }
        .np-demo-chrome {
          background: var(--bg3); border-bottom: .5px solid var(--b1);
          padding: 14px 20px; display: flex; align-items: center; gap: 12px;
        }
        .np-dc-dots { display: flex; gap: 6px; }
        .np-dc-dot  { width: 12px; height: 12px; border-radius: 50%; }
        .np-d1 { background: #ff5f57; } .np-d2 { background: #febc2e; } .np-d3 { background: #28c840; }
        .np-dc-url {
          flex: 1; font-size: 12px; font-weight: 300; color: var(--m2);
          background: var(--m4); border: .5px solid var(--b1);
          border-radius: 6px; padding: 5px 14px; letter-spacing: .2px;
        }
        .np-demo-split { display: grid; grid-template-columns: 220px 1fr; min-height: 480px; }
        .np-demo-ctrl  {
          border-right: .5px solid var(--b1); padding: 28px 22px;
          display: flex; flex-direction: column; gap: 18px;
        }
        .np-ctrl-lbl { font-size: 10px; font-weight: 400; color: var(--m2); letter-spacing: 1.8px; text-transform: uppercase; display: block; margin-bottom: 8px; }
        .np-ctrl-inp {
          width: 100%; background: var(--m4); border: .5px solid var(--b1);
          border-radius: 8px; padding: 10px 14px; color: var(--ow);
          font-family: var(--sf); font-size: 13px; font-weight: 300; outline: none; transition: border-color .2s;
        }
        .np-ctrl-inp:focus { border-color: var(--b2); }
        .np-ctrl-inp::placeholder { color: var(--m2); }
        .np-ctrl-run {
          width: 100%; background: #0071e3; color: #fff;
          font-family: var(--sf); font-size: 13px; font-weight: 400;
          padding: 10px; border-radius: 8px; border: none; cursor: pointer;
          transition: background .2s; letter-spacing: -.01em;
        }
        .np-ctrl-run:hover:not(:disabled) { background: #0077ed; }
        .np-ctrl-run:disabled { opacity: .45; cursor: not-allowed; }
        .np-ctrl-div {
          display: flex; align-items: center; gap: 8px;
          color: var(--m2); font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
        }
        .np-ctrl-div::before, .np-ctrl-div::after { content: ''; flex: 1; height: .5px; background: var(--b1); }
        .np-scen-list { display: flex; flex-direction: column; gap: 5px; }
        .np-scen-btn {
          background: transparent; border: .5px solid var(--b1);
          border-radius: 6px; padding: 8px 12px; color: var(--m1);
          font-family: var(--sf); font-size: 12px; font-weight: 300;
          cursor: pointer; text-align: left; transition: all .2s; letter-spacing: -.01em;
        }
        .np-scen-btn:hover:not(:disabled) { background: var(--m4); border-color: var(--b2); color: var(--ow); }
        .np-scen-btn:disabled { opacity: .35; cursor: not-allowed; }
        .np-cbiz { font-size: 10px; color: var(--m2); line-height: 1.7; letter-spacing: .2px; }
        .np-cbiz span { color: var(--m1); }
        .np-derr { font-size: 11px; color: rgba(255,80,80,.8); line-height: 1.5; }

        .np-demo-feed { padding: 28px 22px; overflow-y: auto; max-height: 480px; display: flex; flex-direction: column; }
        .np-feed-empty {
          flex: 1; display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--m2); text-align: center; line-height: 2; font-weight: 300;
        }
        .np-feed-loading {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px; color: var(--m2); font-size: 12px; font-weight: 300;
        }
        .np-msg-grp { margin-bottom: 16px; animation: np-mfade .3s ease both; }
        @keyframes np-mfade { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        .np-msg-who { font-size: 9px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; margin-bottom: 5px; }
        .np-msg-who.p { color: rgba(255,200,80,.55); }
        .np-msg-who.n { color: rgba(120,180,255,.6); }
        .np-msg-bub {
          display: inline-block; max-width: 88%;
          padding: 10px 14px; border-radius: 4px 10px 10px 10px;
          font-size: 13px; font-weight: 300; line-height: 1.6; letter-spacing: -.01em;
        }
        .np-msg-bub.p { background: rgba(255,200,80,.06); border: .5px solid rgba(255,200,80,.1);  color: var(--ow); }
        .np-msg-bub.n { background: rgba(120,180,255,.06); border: .5px solid rgba(120,180,255,.1); color: var(--ow); }
        .np-trow { display: flex; gap: 4px; padding: 10px 14px; margin-bottom: 16px; }
        .np-ty   { width: 4px; height: 4px; border-radius: 50%; background: var(--m2); animation: np-tyb 1.1s infinite; }
        .np-ty:nth-child(2){ animation-delay:.18s } .np-ty:nth-child(3){ animation-delay:.36s }
        @keyframes np-tyb { 0%,70%,100%{transform:translateY(0)} 35%{transform:translateY(-4px)} }

        /* ── HOW ── */
        .np-how-h { font-size: clamp(32px,5vw,64px); font-weight: 700; letter-spacing: -.04em; line-height: 1.05; color: var(--ow); margin-bottom: 80px; }
        .np-how-steps {
          display: grid; grid-template-columns: repeat(4,1fr);
          max-width: 960px; width: 100%;
          border-top: .5px solid var(--b1);
        }
        .np-how-step { padding: 44px 28px 0; border-right: .5px solid var(--b1); text-align: left; }
        .np-how-step:last-child { border-right: none; }
        .np-hs-n {
          font-size: clamp(40px,5vw,64px); font-weight: 700;
          letter-spacing: -.04em; color: #1d1d1f;
          -webkit-text-stroke: 1px rgba(245,245,247,0.15);
          line-height: 1; margin-bottom: 16px; display: block;
        }
        .np-hs-t { font-size: 17px; font-weight: 600; color: var(--ow); letter-spacing: -.02em; margin-bottom: 8px; }
        .np-hs-d { font-size: 13px; font-weight: 300; color: #6e6e73; line-height: 1.65; letter-spacing: -.01em; }

        /* ── PRICING ── */
        .np-price-h   { font-size: clamp(32px,5vw,64px); font-weight: 700; letter-spacing: -.04em; line-height: 1.05; color: var(--ow); margin-bottom: 16px; }
        .np-price-sub { font-size: 17px; font-weight: 300; color: #6e6e73; margin-bottom: 64px; letter-spacing: -.01em; }
        .np-price-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          max-width: 760px; width: 100%;
          gap: 1px; background: var(--b1);
          border-radius: 18px; overflow: hidden; border: .5px solid var(--b1);
        }
        .np-pplan    { background: var(--bg2); padding: 44px 40px; text-align: left; }
        .np-pplan.hi { background: var(--bg3); }
        .np-pp-tag   { font-size: 12px; font-weight: 500; color: #6e6e73; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 16px; display: block; }
        .np-pp-amt   { font-size: clamp(36px,5vw,56px); font-weight: 700; letter-spacing: -.04em; color: var(--ow); line-height: 1; margin-bottom: 4px; }
        .np-pp-per   { font-size: 14px; font-weight: 300; color: #6e6e73; margin-bottom: 28px; display: block; }
        .np-pp-line  { height: .5px; background: var(--b1); margin-bottom: 24px; }
        .np-pp-feats { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
        .np-pp-f     { font-size: 14px; font-weight: 300; color: #86868b; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; }
        .np-pp-f::before { content:'✓'; color:#30d158; font-size:12px; margin-top:2px; flex-shrink:0; }
        .np-pp-btn {
          display: inline-block; background: #0071e3; color: #fff;
          font-size: 14px; font-weight: 400; padding: 10px 22px;
          border-radius: 980px; border: none; cursor: pointer;
          text-decoration: none; transition: background .2s; letter-spacing: -.01em;
        }
        .np-pp-btn:hover { background: #0077ed; }
        .np-pp-btn.ghost { background: transparent; color: #2997ff; border: .5px solid rgba(41,151,255,.4); }
        .np-pp-btn.ghost:hover { background: rgba(41,151,255,.08); }
        .np-pp-note { font-size: 12px; color: #6e6e73; margin-top: 12px; line-height: 1.5; }

        /* ── FINAL CTA ── */
        .np-cta-h   { font-size: clamp(36px,6vw,80px); font-weight: 700; letter-spacing: -.04em; line-height: 1.05; color: var(--ow); margin-bottom: 12px; }
        .np-cta-sub { font-size: clamp(17px,2vw,24px); font-weight: 300; color: #6e6e73; max-width: 500px; margin: 0 auto 40px; line-height: 1.5; letter-spacing: -.01em; }
        .np-cta-note { margin-top: 20px; font-size: 13px; color: #6e6e73; }

        /* ── FOOTER ── */
        .np-footer {
          background: var(--bg2); border-top: .5px solid var(--b1);
          padding: 20px 44px; display: flex; align-items: center; justify-content: space-between;
        }
        .np-fright { display: flex; gap: 28px; }
        .np-flink  { font-size: 12px; color: #6e6e73; text-decoration: none; transition: color .2s; }
        .np-flink:hover { color: var(--ow); }

        /* ── SCROLL REVEAL ── */
        .np-sr {
          opacity: 0; transform: translateY(24px);
          transition: opacity .8s cubic-bezier(.25,.46,.45,.94), transform .8s cubic-bezier(.25,.46,.45,.94);
        }
        .np-sr.np-vis { opacity: 1; transform: none; }
        .np-d1 { transition-delay: .1s; } .np-d2 { transition-delay: .2s; }
        .np-d3 { transition-delay: .3s; } .np-d4 { transition-delay: .4s; }

        /* ── RESPONSIVE ── */
        @media(max-width: 768px) {
          .np-nav { padding: 0 20px; }
          .np-nav-links li:not(:last-child) { display: none; }
          .np-hero { padding: 80px 20px 60px; }
          .np-section { padding: 80px 20px; }
          .np-feat-grid { grid-template-columns: 1fr; }
          .np-how-steps { grid-template-columns: 1fr 1fr; }
          .np-how-step { border-right: none; border-bottom: .5px solid var(--b1); padding: 28px 0; }
          .np-demo-split { grid-template-columns: 1fr; }
          .np-demo-ctrl { border-right: none; border-bottom: .5px solid var(--b1); }
          .np-price-grid { grid-template-columns: 1fr; }
          .np-footer { padding: 24px 20px; flex-direction: column; gap: 16px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="np-nav">
        <Link href="/" className="np-nav-back">‹ Unico Studios</Link>
        <Link href="#top" className="np-logo">niquo</Link>
        <ul className="np-nav-links">
          <li><a href="#demo">Demo</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#demo" className="np-nav-cta">Try free</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="np-hero" id="top" ref={heroRef}>
        <canvas ref={canvasRef} />
        <div className="np-hero-fade" />
        <div className="np-hero-content">
          <p className="np-hero-ey">Introducing Niquo</p>
          <h1 className="np-hero-h1">
            Your AI sales rep.<br />
            <span className="np-grad">Always on.</span>
          </h1>
          <p className="np-hero-sub">
            Niquo reads any business in 60 seconds and becomes its salesperson — handling every lead on WhatsApp, chat, and calls.
          </p>
          <div className="np-hero-actions">
            <a href="#demo" className="np-btn-blue">Watch the demo</a>
            <a href="#features" className="np-btn-link">Learn more ›</a>
          </div>

          {/* Phone mockup */}
          <div className="np-phone-wrap">
            <div className="np-phone">
              <div className="np-notch" />
              <div className="np-phone-screen">
                <div className="np-ps-status">
                  <span className="np-ps-time">9:41</span>
                  <div className="np-ps-bars">
                    {[6,9,12,9].map((h,i) => (
                      <div key={i} className="np-ps-bar" style={{ height: `${h}px` }} />
                    ))}
                  </div>
                </div>
                <div className="np-wa-hdr">
                  <div className="np-wa-av">B</div>
                  <div>
                    <div className="np-wa-name">Bhive Workspace</div>
                    <div className="np-wa-status">● Niquo is online</div>
                  </div>
                </div>
                <div className="np-chat-area">
                  <div className="np-chat-them">Hi, looking for coworking in Koramangala</div>
                  <div className="np-chat-us">Hey! We have a great space there 🙌 Dedicated desk or hot desk?<div className="np-chat-time">✓✓ 9:41</div></div>
                  <div className="np-chat-them">Hot desk, maybe 10 days a month</div>
                  <div className="np-chat-us">Perfect — that's our Day Pass at ₹499/day. Want me to check this week's availability? 📅<div className="np-chat-time">✓✓ 9:41</div></div>
                </div>
              </div>
            </div>
            <div className="np-phone-glow" />
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="np-ticker">
        <div className="np-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="np-ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── TAGLINE 1 ── */}
      <section className="np-section" style={{ background: '#000' }}>
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'12px', letterSpacing:'-0.1px', fontFamily:'var(--sf)' }}>The problem</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(40px,6vw,80px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', maxWidth:'800px', textAlign:'center' }}>
          Leads come in.<br />
          <span style={{ color:'#6e6e73', fontStyle:'normal' }}>Nobody responds fast enough.</span><br />
          Revenue disappears.
        </h2>
        <p className="np-sr np-d2" style={{ fontFamily:'var(--sf)', fontSize:'clamp(17px,2vw,24px)', fontWeight:300, color:'#6e6e73', maxWidth:'560px', marginTop:'16px', lineHeight:1.5, letterSpacing:'-0.01em', textAlign:'center' }}>
          The average response time to an inbound lead is 47 hours. Niquo responds in seconds.
        </p>
      </section>

      {/* ── FEATURES ── */}
      <section className="np-section" id="features" style={{ background: '#0a0a0a' }}>
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'8px', letterSpacing:'-0.1px', fontFamily:'var(--sf)' }}>Capabilities</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(32px,5vw,64px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', marginBottom:'80px', textAlign:'center' }}>Not a chatbot.<br />A closer.</h2>
        <div className="np-feat-grid np-sr np-d2">
          {FEATURES.map((f) => (
            <div key={f.title} className="np-feat-card">
              <div className="np-feat-icon">{f.svg}</div>
              <div className="np-feat-title">{f.title}</div>
              <p className="np-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TAGLINE 2 ── */}
      <section className="np-section" style={{ background: '#000' }}>
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'12px', letterSpacing:'-0.1px', fontFamily:'var(--sf)' }}>The result</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(40px,6vw,80px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', maxWidth:'800px', textAlign:'center' }}>
          Your team only talks<br />to people<br />
          <span style={{ color:'#6e6e73', fontStyle:'normal' }}>ready to buy.</span>
        </h2>
        <p className="np-sr np-d2" style={{ fontFamily:'var(--sf)', fontSize:'clamp(17px,2vw,24px)', fontWeight:300, color:'#6e6e73', maxWidth:'560px', marginTop:'16px', lineHeight:1.5, letterSpacing:'-0.01em', textAlign:'center' }}>
          Niquo qualifies every lead before it reaches you. No more chasing. Only closing.
        </p>
      </section>

      {/* ── DEMO ── */}
      <section className="np-section" id="demo" style={{ background: '#000' }}>
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'8px', fontFamily:'var(--sf)' }}>Live demo</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(36px,5vw,64px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', marginBottom:'12px', textAlign:'center' }}>Watch Niquo sell your business.</h2>
        <p className="np-sr np-d2" style={{ fontFamily:'var(--sf)', fontSize:'17px', fontWeight:300, color:'#6e6e73', maxWidth:'540px', margin:'0 auto 60px', lineHeight:1.55, letterSpacing:'-0.01em', textAlign:'center' }}>
          Paste any URL. Niquo reads the business and runs a full sales simulation — acting as that company's salesperson. Both sides. Automatically.
        </p>
        <div className="np-sr np-d3" style={{ width: '100%' }}>
          <DemoFeed />
        </div>
      </section>

      {/* ── HOW ── */}
      <section className="np-section" style={{ background: '#0a0a0a' }}>
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'8px', fontFamily:'var(--sf)' }}>The process</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(32px,5vw,64px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', marginBottom:'80px', textAlign:'center' }}>From URL to live agent.</h2>
        <div className="np-how-steps">
          {HOW_STEPS.map((s, i) => (
            <div key={s.n} className={`np-how-step np-sr np-d${i+1}`}>
              <span className="np-hs-n">{s.n}</span>
              <div className="np-hs-t">{s.t}</div>
              <p className="np-hs-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="np-section" id="pricing" style={{ background: '#000' }}>
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'8px', fontFamily:'var(--sf)' }}>Pricing</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(32px,5vw,64px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', marginBottom:'16px', textAlign:'center' }}>Less than one bad hire.</h2>
        <p className="np-sr np-d2" style={{ fontFamily:'var(--sf)', fontSize:'17px', fontWeight:300, color:'#6e6e73', marginBottom:'64px', letterSpacing:'-0.01em', textAlign:'center' }}>No setup fees. No long-term contracts. Try the demo free.</p>
        <div className="np-price-grid np-sr np-d3">
          <div className="np-pplan">
            <span className="np-pp-tag">Starter</span>
            <div className="np-pp-amt">₹4,999</div>
            <span className="np-pp-per">per month</span>
            <div className="np-pp-line" />
            <div className="np-pp-feats">
              <div className="np-pp-f">1 channel (WhatsApp or chat)</div>
              <div className="np-pp-f">Full Niquo simulation demo</div>
              <div className="np-pp-f">Objection handling included</div>
              <div className="np-pp-f">500 conversations / month</div>
              <div className="np-pp-f">Email support</div>
            </div>
            <a href="#demo" className="np-pp-btn ghost">Try free demo</a>
            <p className="np-pp-note">No signup needed to try.</p>
          </div>
          <div className="np-pplan hi">
            <span className="np-pp-tag">Growth</span>
            <div className="np-pp-amt">Custom</div>
            <span className="np-pp-per">talk to us</span>
            <div className="np-pp-line" />
            <div className="np-pp-feats">
              <div className="np-pp-f">All channels — WhatsApp, chat, calls</div>
              <div className="np-pp-f">CRM + calendar integration</div>
              <div className="np-pp-f">Custom qualification playbooks</div>
              <div className="np-pp-f">Unlimited conversations</div>
              <div className="np-pp-f">Dedicated onboarding support</div>
            </div>
            <a href="https://unicostudios.in" className="np-pp-btn">Talk to the team</a>
            <p className="np-pp-note">For teams doing serious volume.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="np-section" style={{ background: '#000', position: 'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(80,80,120,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <p className="np-sr" style={{ fontSize:'14px', fontWeight:400, color:'#6e6e73', marginBottom:'8px', fontFamily:'var(--sf)' }}>Get started today</p>
        <h2 className="np-sr np-d1" style={{ fontFamily:'var(--sf)', fontSize:'clamp(36px,6vw,80px)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', marginBottom:'12px', textAlign:'center' }}>Your leads deserve<br />a better answer.</h2>
        <p className="np-sr np-d2" style={{ fontFamily:'var(--sf)', fontSize:'clamp(17px,2vw,24px)', fontWeight:300, color:'#6e6e73', maxWidth:'500px', margin:'0 auto 40px', lineHeight:1.5, letterSpacing:'-0.01em', textAlign:'center' }}>
          Try Niquo free. Paste your URL. See it sell your business in 60 seconds.
        </p>
        <div className="np-sr np-d3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#demo" className="np-btn-blue">Watch the demo</a>
          <a href="https://unicostudios.in" className="np-btn-link">Talk to the team ›</a>
        </div>
        <p className="np-cta-note np-sr np-d4">
          Starting from ₹4,999/month · Built by Unico Studios, Bangalore · India
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="np-footer">
        <Link href="/" className="np-logo">niquo</Link>
        <div className="np-fright">
          <a href="https://unicostudios.in" className="np-flink">Unico Studios</a>
          <a href="#"                        className="np-flink">Privacy</a>
          <a href="#"                        className="np-flink">Contact</a>
          <span className="np-flink">© 2026</span>
        </div>
      </footer>

      {/* ── SCROLL REVEAL INIT ── */}
      <ScrollReveal />
    </>
  );
}

// Scroll reveal as a client component side-effect
function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.np-sr');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('np-vis'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
