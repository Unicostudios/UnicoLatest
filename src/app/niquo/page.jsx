'use client';

// PATH: src/app/niquo/page.jsx
// ZERO classNames for layout/styling — 100% inline styles
// Tailwind cannot interfere with inline styles ever.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const C = {
  black:   '#000000',
  black2:  '#0a0a0a',
  black3:  '#111111',
  black4:  '#1a1a1a',
  white:   '#f5f5f7',
  gray:    '#6e6e73',
  gray2:   'rgba(245,245,247,0.1)',
  gray3:   'rgba(245,245,247,0.05)',
  gray4:   'rgba(245,245,247,0.28)',
  blue:    '#0071e3',
  blue2:   '#2997ff',
  green:   '#30d158',
  wa:      '#25d366',
  amber:   'rgba(255,200,80,0.55)',
  violet:  'rgba(120,180,255,0.6)',
  sf:      "-apple-system,'SF Pro Display','Helvetica Neue',Arial,sans-serif",
  brand:   "'Comfortaa',sans-serif",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── PARSE SIMULATION ───────────────────────────────────────────────────────
function parseSimulation(reply) {
  const lines = reply.split('\n');
  const msgs = [];
  let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('PROSPECT:'))      { if (cur) msgs.push(cur); cur = { r: 'p', t: t.replace('PROSPECT:', '').trim() }; }
    else if (t.startsWith('NIQUO:'))    { if (cur) msgs.push(cur); cur = { r: 'n', t: t.replace('NIQUO:', '').trim() }; }
    else if (t === 'END_SIMULATION')    { break; }
    else if (cur && t)                  { cur.t += ' ' + t; }
  }
  if (cur) msgs.push(cur);
  return msgs;
}

// ── NEURAL CANVAS ──────────────────────────────────────────────────────────
function useNeuralCanvas(canvasRef, heroRef) {
  const mouse = useRef({ x: -999, y: -999 });
  const pts   = useRef([]);
  const raf   = useRef(null);

  useEffect(() => {
    const cvs  = canvasRef.current;
    const hero = heroRef.current;
    if (!cvs || !hero) return;
    const ctx = cvs.getContext('2d');

    const resize = () => {
      cvs.width  = hero.offsetWidth;
      cvs.height = hero.offsetHeight;
      const W = cvs.width, H = cvs.height;
      pts.current = Array.from({ length: Math.floor((W * H) / 14000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.1, ba: 0.07 + Math.random() * 0.15,
      }));
    };

    const draw = () => {
      const W = cvs.width, H = cvs.height;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.current.length; i++) {
        const p = pts.current[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dm   = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
        const glow = dm < 120 ? (1 - dm / 120) * 0.4 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,245,247,${Math.min(1, p.ba + glow).toFixed(3)})`;
        ctx.fill();
        for (let j = i + 1; j < pts.current.length; j++) {
          const q = pts.current[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(245,245,247,${((1 - d / 100) * 0.04).toFixed(3)})`;
            ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    const onMove  = (e) => { const r = cvs.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = ()  => { mouse.current = { x: -999, y: -999 }; };

    window.addEventListener('resize', resize);
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    resize(); draw();
    return () => { window.removeEventListener('resize', resize); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
}

// ── DEMO FEED ──────────────────────────────────────────────────────────────
const TRIGGERS = {
  Skeptic: 'SIMULATE_SCENARIO SKEPTIC', Angry: 'SIMULATE_SCENARIO ANGRY',
  Price: 'SIMULATE_SCENARIO PRICE',     Competitor: 'SIMULATE_SCENARIO COMPETITOR',
  Almost: 'SIMULATE_SCENARIO ALMOST',   Ghost: 'SIMULATE_SCENARIO GHOSTER',
};
const SCENARIO_LABELS = {
  Skeptic: 'The Skeptic', Angry: 'The Angry Lead', Price: 'Price Objection',
  Competitor: 'Competitor Battle', Almost: 'Almost Closed', Ghost: 'The Ghost',
};

function DemoFeed() {
  const [msgs,    setMsgs]    = useState([]);
  const [running, setRunning] = useState(false);
  const [typing,  setTyping]  = useState(false);
  const [url,     setUrl]     = useState('');
  const [err,     setErr]     = useState('');
  const [bizUrl,  setBizUrl]  = useState(null);
  const feedRef = useRef(null);
  const histRef = useRef([]);

  useEffect(() => { if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight; }, [msgs, typing]);

  const stream = async (parsed) => {
    for (const m of parsed) {
      const isP = m.r === 'p';
      setTyping(true);
      await sleep(isP ? 850 : 1400);
      setTyping(false);
      setMsgs((p) => [...p, { role: m.r, text: '', partial: true }]);
      for (const w of m.t.split(' ')) {
        setMsgs((p) => { const c = [...p]; c[c.length - 1] = { role: m.r, text: c[c.length - 1].text + (c[c.length - 1].text ? ' ' : '') + w, partial: true }; return c; });
        await sleep(isP ? 46 : 64);
      }
      setMsgs((p) => { const c = [...p]; c[c.length - 1] = { ...c[c.length - 1], partial: false }; return c; });
      await sleep(isP ? 360 : 520);
    }
  };

  const callApi = async (message, useUrl) => {
    if (running) return;
    setRunning(true); setErr(''); setMsgs([]); setTyping(false);
    try {
      const res  = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: histRef.current, mode: 'niquo', email: 'demo@niquo.ai', uploadedContent: null, confirmedUrl: useUrl || null }) });
      if (!res.ok) throw new Error();
      const data   = await res.json();
      const parsed = parseSimulation(data.reply || '');
      await stream(parsed.length ? parsed : [{ r: 'n', t: data.reply }]);
      histRef.current = [...histRef.current, { role: 'user', content: message }, { role: 'assistant', content: data.reply }];
    } catch { setErr('Something went wrong. Try again.'); }
    finally { setRunning(false); setTyping(false); }
  };

  const handleRun = () => {
    if (!url.trim()) { setErr('Enter your website URL first.'); return; }
    setErr('');
    const clean = url.startsWith('http') ? url : 'https://' + url;
    setBizUrl(clean); histRef.current = [];
    callApi(clean, clean);
  };

  const handleScen = (key) => {
    if (!bizUrl) { setErr('Run the main demo first.'); return; }
    setErr(''); callApi(TRIGGERS[key], bizUrl);
  };

  // Styles
  const S = {
    shell:   { background: C.black2, border: `0.5px solid ${C.gray2}`, borderRadius: '12px', overflow: 'hidden', maxWidth: '900px', margin: '0 auto', textAlign: 'left' },
    chrome:  { background: C.black3, borderBottom: `0.5px solid ${C.gray2}`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
    dot:     (bg) => ({ width: '11px', height: '11px', borderRadius: '50%', background: bg }),
    url:     { flex: 1, fontSize: '11px', fontWeight: 300, color: C.gray4, background: C.gray3, border: `0.5px solid ${C.gray2}`, borderRadius: '4px', padding: '5px 14px', fontFamily: C.sf },
    split:   { display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '480px' },
    ctrl:    { borderRight: `0.5px solid ${C.gray2}`, padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: '18px' },
    lbl:     { fontSize: '10px', fontWeight: 400, color: C.gray4, letterSpacing: '1.8px', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontFamily: C.sf },
    inp:     { width: '100%', background: C.gray3, border: `0.5px solid ${C.gray2}`, borderRadius: '8px', padding: '10px 14px', color: C.white, fontFamily: C.sf, fontSize: '13px', fontWeight: 300, outline: 'none' },
    runBtn:  (disabled) => ({ width: '100%', background: disabled ? '#444' : C.blue, color: C.white, fontFamily: C.sf, fontSize: '13px', fontWeight: 400, padding: '11px', borderRadius: '8px', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', letterSpacing: '-0.01em' }),
    divider: { display: 'flex', alignItems: 'center', gap: '8px', color: C.gray4, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 300, fontFamily: C.sf },
    scenBtn: { background: 'transparent', border: `0.5px solid ${C.gray2}`, borderRadius: '6px', padding: '8px 12px', color: 'rgba(245,245,247,0.56)', fontFamily: C.sf, fontSize: '12px', fontWeight: 300, cursor: 'pointer', textAlign: 'left', width: '100%', marginBottom: '5px' },
    feed:    { padding: '28px 22px', overflowY: 'auto', maxHeight: '480px', display: 'flex', flexDirection: 'column' },
    empty:   { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: C.gray4, textAlign: 'center', lineHeight: 2, fontFamily: C.sf, fontWeight: 300 },
    loading: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', color: C.gray4, fontSize: '12px', fontWeight: 300, fontFamily: C.sf },
    msgWho:  (role) => ({ fontSize: '9px', fontWeight: 500, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '5px', fontFamily: C.sf, color: role === 'p' ? C.amber : C.violet }),
    msgBub:  (role) => ({ display: 'inline-block', maxWidth: '88%', padding: '10px 14px', borderRadius: role === 'p' ? '4px 10px 10px 10px' : '10px 10px 4px 10px', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, fontFamily: C.sf, background: role === 'p' ? 'rgba(255,200,80,0.06)' : 'rgba(120,180,255,0.06)', border: role === 'p' ? '0.5px solid rgba(255,200,80,0.1)' : '0.5px solid rgba(120,180,255,0.1)', color: C.white }),
  };

  return (
    <div style={S.shell}>
      {/* Chrome */}
      <div style={S.chrome}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={S.dot('#ff5f57')} />
          <div style={S.dot('#febc2e')} />
          <div style={S.dot('#28c840')} />
        </div>
        <div style={S.url}>{bizUrl || 'unicostudios.in/niquo — live demo'}</div>
      </div>

      {/* Split */}
      <div style={S.split}>
        {/* Controls */}
        <div style={S.ctrl}>
          <div>
            <span style={S.lbl}>your business</span>
            <input style={S.inp} type="text" placeholder="yourwebsite.com" value={url}
              onChange={(e) => { setUrl(e.target.value); setErr(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleRun()} />
          </div>
          {err && <p style={{ fontSize: '11px', color: 'rgba(255,80,80,0.8)', fontFamily: C.sf, lineHeight: 1.5 }}>{err}</p>}
          <button style={S.runBtn(running)} onClick={handleRun} disabled={running}>
            {running ? 'Niquo is thinking…' : 'Run simulation'}
          </button>
          <div style={S.divider}>
            <div style={{ flex: 1, height: '0.5px', background: C.gray2 }} />
            scenarios
            <div style={{ flex: 1, height: '0.5px', background: C.gray2 }} />
          </div>
          <div>
            {Object.keys(TRIGGERS).map((key) => (
              <button key={key} style={S.scenBtn} onClick={() => handleScen(key)} disabled={running}>
                {SCENARIO_LABELS[key]}
              </button>
            ))}
          </div>
          {bizUrl && (
            <p style={{ fontSize: '10px', color: C.gray4, lineHeight: 1.7, fontFamily: C.sf }}>
              Niquo is selling for<br /><span style={{ color: 'rgba(245,245,247,0.56)' }}>{bizUrl}</span>
            </p>
          )}
        </div>

        {/* Feed */}
        <div style={S.feed} ref={feedRef}>
          {msgs.length === 0 && !typing && !running && (
            <div style={S.empty}>Paste your business URL above.<br />Watch Niquo become your salesperson.</div>
          )}
          {running && msgs.length === 0 && (
            <div style={S.loading}>
              <TypingDots />
              <span>Reading your business…</span>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={S.msgWho(m.role)}>{m.role === 'p' ? 'PROSPECT' : 'NIQUO'}</div>
              <div style={S.msgBub(m.role)}>{m.text}</div>
            </div>
          ))}
          {typing && <div style={{ marginBottom: '16px' }}><TypingDots /></div>}
        </div>
      </div>
    </div>
  );
}

// ── TYPING DOTS ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <>
      <style>{`.nq-ty{width:4px;height:4px;border-radius:50%;background:rgba(245,245,247,0.28);animation:nqtyb 1.1s infinite;display:inline-block;}.nq-ty:nth-child(2){animation-delay:.18s}.nq-ty:nth-child(3){animation-delay:.36s}@keyframes nqtyb{0%,70%,100%{transform:translateY(0)}35%{transform:translateY(-4px)}}`}</style>
      <div style={{ display: 'flex', gap: '4px', padding: '6px 2px' }}>
        <div className="nq-ty" /><div className="nq-ty" /><div className="nq-ty" />
      </div>
    </>
  );
}

// ── SCROLL REVEAL ──────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `.nq-sr{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.25,.46,.45,.94),transform .8s cubic-bezier(.25,.46,.45,.94)}.nq-sr.nq-vis{opacity:1;transform:none}.nq-d1{transition-delay:.1s}.nq-d2{transition-delay:.2s}.nq-d3{transition-delay:.3s}.nq-d4{transition-delay:.4s}`;
    document.head.appendChild(style);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('nq-vis'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.nq-sr').forEach((el) => io.observe(el));
    return () => { io.disconnect(); document.head.removeChild(style); };
  }, []);
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function NiquoPage() {
  const canvasRef = useRef(null);
  const heroRef   = useRef(null);
  useNeuralCanvas(canvasRef, heroRef);
  useScrollReveal();

  // ── Shared style helpers ──
  const section = (bg, extra = {}) => ({
    background: bg, padding: '120px 44px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', position: 'relative', overflow: 'hidden',
    ...extra,
  });

  const eyebrow = { fontSize: '14px', fontWeight: 400, color: C.gray, marginBottom: '12px', letterSpacing: '-0.1px', fontFamily: C.sf };
  const bigH    = (size = 'clamp(40px,6vw,80px)') => ({ fontFamily: C.sf, fontSize: size, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, color: C.white, maxWidth: '800px', textAlign: 'center' });
  const subText = { fontFamily: C.sf, fontSize: 'clamp(17px,2vw,24px)', fontWeight: 300, color: C.gray, maxWidth: '560px', marginTop: '16px', lineHeight: 1.5, letterSpacing: '-0.01em', textAlign: 'center' };

  const FEATURES = [
    { color: '#2997ff', title: 'Reads any business in 60s',    desc: 'Paste a URL. Niquo learns your product, pricing, and pitch — and deploys as your best rep, instantly.' },
    { color: '#30d158', title: 'Handles every objection',       desc: 'Price, skeptics, competitors, ghosts — calibrated responses for every scenario, specific to your business.' },
    { color: '#ff9f0a', title: 'Multilingual by default',       desc: 'Hindi, Tamil, Kannada, Hinglish — Niquo mirrors the exact language and tone your lead uses.' },
    { color: '#bf5af2', title: 'WhatsApp · Chat · Calls',       desc: 'One Niquo, every channel. Conversations sync to your CRM automatically.' },
    { color: '#ff375f', title: 'Auto follow-up',                desc: 'No more cold leads going silent. Niquo follows up every ghost at exactly the right time.' },
    { color: '#64d2ff', title: 'CRM + calendar sync',           desc: 'Hot leads logged, meetings booked, pipeline always fresh — zero manual work from your team.' },
  ];

  const HOW = [
    { n: '01', t: 'Share your URL',       d: 'Niquo reads your site — product, pricing, tone — and builds your agent from scratch.' },
    { n: '02', t: 'We configure',         d: 'Objection playbooks, qualification rules, follow-up cadences — all tuned to your business.' },
    { n: '03', t: 'Go live',              d: 'Niquo deploys on WhatsApp, chat, or calls. No long contracts, no engineering needed.' },
    { n: '04', t: 'You only close',       d: 'Hot leads land in your CRM. Your team talks only to people ready to buy.' },
  ];

  const TICKER = ['WhatsApp','HubSpot','Salesforce','Calendly','Slack','Zoom','Google Ads','Meta Ads','Interakt','Wati','Yellow.ai'];

  return (
    <>
      {/* Fonts only — no layout CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #000 !important; }
        @keyframes nqtick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes nqpulse { 0%,100%{opacity:1;box-shadow:0 0 6px #30d158} 50%{opacity:.3;box-shadow:0 0 2px #30d158} }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 44px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: '0.5px solid rgba(245,245,247,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '12px', color: 'rgba(245,245,247,0.28)', textDecoration: 'none', fontFamily: C.sf }}>‹ Unico Studios</Link>
        <Link href="#top" style={{ fontFamily: C.brand, fontSize: '18px', fontWeight: 300, color: C.white, letterSpacing: '2px', textDecoration: 'none' }}>niquo</Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {['#demo','#features','#pricing'].map((h, i) => (
            <a key={i} href={h} style={{ fontSize: '12px', color: 'rgba(245,245,247,0.56)', textDecoration: 'none', fontFamily: C.sf }}>
              {['Demo','Features','Pricing'][i]}
            </a>
          ))}
          <a href="#demo" style={{ fontSize: '12px', color: C.white, background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(245,245,247,0.18)', padding: '6px 16px', borderRadius: '20px', textDecoration: 'none', fontFamily: C.sf }}>
            Try free
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 44px 60px', overflow: 'hidden', background: C.black }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: `linear-gradient(transparent, ${C.black})`, pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p className="nq-sr" style={{ fontSize: '17px', fontWeight: 400, color: C.gray, letterSpacing: '-0.2px', marginBottom: '10px', fontFamily: C.sf }}>Introducing Niquo</p>
          <h1 className="nq-sr nq-d1" style={{ fontFamily: C.sf, fontSize: 'clamp(48px,8vw,96px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: C.white, marginBottom: '10px' }}>
            Your AI sales rep.<br />
            <span style={{ background: 'linear-gradient(135deg,#f5f5f7 0%,#8a8a8e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Always on.</span>
          </h1>
          <p className="nq-sr nq-d2" style={{ fontFamily: C.sf, fontSize: 'clamp(19px,2.5vw,28px)', fontWeight: 300, color: C.gray, letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: '40px', maxWidth: '620px' }}>
            Niquo reads any business in 60 seconds and becomes its salesperson — handling every lead on WhatsApp, chat, and calls.
          </p>
          <div className="nq-sr nq-d3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#demo" style={{ background: C.blue, color: C.white, fontSize: '17px', fontWeight: 400, padding: '12px 26px', borderRadius: '980px', border: 'none', cursor: 'pointer', textDecoration: 'none', fontFamily: C.sf, letterSpacing: '-0.01em', display: 'inline-block' }}>Watch the demo</a>
            <a href="#features" style={{ fontSize: '17px', fontWeight: 400, color: C.blue2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: C.sf, letterSpacing: '-0.01em' }}>Learn more ›</a>
          </div>

          {/* Phone mockup */}
          <div className="nq-sr nq-d4" style={{ marginTop: '72px', position: 'relative', display: 'inline-block' }}>
            <div style={{ width: '280px', height: '560px', background: 'linear-gradient(160deg,#1c1c1e 0%,#0a0a0a 100%)', borderRadius: '46px', border: '1.5px solid rgba(255,255,255,0.15)', boxShadow: '0 60px 120px rgba(0,0,0,0.8),inset 0 0 0 1px rgba(255,255,255,0.08)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: '100px', height: '28px', background: '#000', borderRadius: '0 0 20px 20px', margin: '0 auto', position: 'relative', zIndex: 2 }} />
              <div style={{ position: 'absolute', inset: 0, padding: '36px 16px 20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: C.white, fontFamily: C.sf }}>9:41</span>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
                    {[6,9,12,9].map((h,i) => <div key={i} style={{ width: '3px', height: `${h}px`, borderRadius: '1px', background: C.white }} />)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '0.5px solid rgba(255,255,255,0.08)', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#25d366,#128c7e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0, fontFamily: C.sf }}>B</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: C.white, fontFamily: C.sf }}>Bhive Workspace</div>
                    <div style={{ fontSize: '11px', color: C.wa, fontFamily: C.sf }}>● Niquo is online</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end' }}>
                  {[
                    { side: 'them', t: 'Hi, looking for coworking in Koramangala' },
                    { side: 'us',   t: 'Hey! Great space right there 🙌 Dedicated or hot desk?' },
                    { side: 'them', t: 'Hot desk, 10 days a month' },
                    { side: 'us',   t: 'Perfect — Day Pass at ₹499/day. Check this week? 📅' },
                  ].map((m, i) => (
                    <div key={i} style={{ alignSelf: m.side === 'them' ? 'flex-start' : 'flex-end', background: m.side === 'them' ? '#1c1c1e' : '#0b5d2e', color: C.white, padding: '8px 12px', borderRadius: m.side === 'them' ? '4px 12px 12px 12px' : '12px 12px 4px 12px', fontSize: '12px', lineHeight: 1.45, maxWidth: '80%', fontFamily: C.sf }}>
                      {m.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '200px', background: 'radial-gradient(ellipse,rgba(37,211,102,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ borderTop: '0.5px solid rgba(245,245,247,0.1)', borderBottom: '0.5px solid rgba(245,245,247,0.1)', padding: '13px 0', overflow: 'hidden', background: C.black2 }}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', animation: 'nqtick 28s linear infinite', width: 'max-content' }}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(245,245,247,0.28)', letterSpacing: '2.2px', textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: C.sf }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── TAGLINE 1 ── */}
      <section style={section(C.black)}>
        <p className="nq-sr" style={eyebrow}>The problem</p>
        <h2 className="nq-sr nq-d1" style={bigH()}>
          Leads come in.<br />
          <span style={{ color: C.gray }}>Nobody responds fast enough.</span><br />
          Revenue disappears.
        </h2>
        <p className="nq-sr nq-d2" style={subText}>The average response time to an inbound lead is 47 hours. Niquo responds in seconds.</p>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={section(C.black2)}>
        <p className="nq-sr" style={eyebrow}>Capabilities</p>
        <h2 className="nq-sr nq-d1" style={{ ...bigH('clamp(32px,5vw,64px)'), marginBottom: '80px' }}>Not a chatbot.<br />A closer.</h2>
        <div className="nq-sr nq-d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(245,245,247,0.1)', borderRadius: '18px', overflow: 'hidden', border: '0.5px solid rgba(245,245,247,0.1)', maxWidth: '960px', width: '100%' }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: C.black3, padding: '40px 36px', textAlign: 'left' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: f.color, marginBottom: '20px', boxShadow: `0 0 12px ${f.color}` }} />
              <div style={{ fontSize: '19px', fontWeight: 600, color: C.white, letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.2, fontFamily: C.sf }}>{f.title}</div>
              <p style={{ fontSize: '14px', fontWeight: 300, color: C.gray, lineHeight: 1.6, letterSpacing: '-0.01em', fontFamily: C.sf }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TAGLINE 2 ── */}
      <section style={section(C.black)}>
        <p className="nq-sr" style={eyebrow}>The result</p>
        <h2 className="nq-sr nq-d1" style={bigH()}>
          Your team only talks<br />to people<br />
          <span style={{ color: C.gray }}>ready to buy.</span>
        </h2>
        <p className="nq-sr nq-d2" style={subText}>Niquo qualifies every lead before it reaches you. No more chasing. Only closing.</p>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" style={section(C.black)}>
        <p className="nq-sr" style={eyebrow}>Live demo</p>
        <h2 className="nq-sr nq-d1" style={{ ...bigH('clamp(36px,5vw,64px)'), marginBottom: '12px' }}>Watch Niquo sell your business.</h2>
        <p className="nq-sr nq-d2" style={{ fontFamily: C.sf, fontSize: '17px', fontWeight: 300, color: C.gray, maxWidth: '540px', margin: '0 auto 60px', lineHeight: 1.55, letterSpacing: '-0.01em', textAlign: 'center' }}>
          Paste any URL. Niquo reads the business and runs a full sales simulation — acting as that company's salesperson. Both sides. Automatically.
        </p>
        <div className="nq-sr nq-d3" style={{ width: '100%', maxWidth: '900px' }}>
          <DemoFeed />
        </div>
      </section>

      {/* ── HOW ── */}
      <section style={section(C.black2)}>
        <p className="nq-sr" style={eyebrow}>The process</p>
        <h2 className="nq-sr nq-d1" style={{ ...bigH('clamp(32px,5vw,64px)'), marginBottom: '80px' }}>From URL to live agent.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: '960px', width: '100%', borderTop: '0.5px solid rgba(245,245,247,0.1)' }}>
          {HOW.map((s, i) => (
            <div key={s.n} className={`nq-sr nq-d${i + 1}`} style={{ padding: '44px 28px 0', borderRight: i < 3 ? '0.5px solid rgba(245,245,247,0.1)' : 'none', textAlign: 'left' }}>
              <span style={{ fontSize: 'clamp(40px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'rgba(245,245,247,0.08)', lineHeight: 1, marginBottom: '16px', display: 'block', fontFamily: C.sf }}>{s.n}</span>
              <div style={{ fontSize: '17px', fontWeight: 600, color: C.white, letterSpacing: '-0.02em', marginBottom: '8px', fontFamily: C.sf }}>{s.t}</div>
              <p style={{ fontSize: '13px', fontWeight: 300, color: C.gray, lineHeight: 1.65, letterSpacing: '-0.01em', fontFamily: C.sf }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={section(C.black)}>
        <p className="nq-sr" style={eyebrow}>Pricing</p>
        <h2 className="nq-sr nq-d1" style={{ ...bigH('clamp(32px,5vw,64px)'), marginBottom: '16px' }}>Less than one bad hire.</h2>
        <p className="nq-sr nq-d2" style={{ fontFamily: C.sf, fontSize: '17px', fontWeight: 300, color: C.gray, marginBottom: '64px', letterSpacing: '-0.01em' }}>No setup fees. No long-term contracts. Try the demo free.</p>
        <div className="nq-sr nq-d3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '760px', width: '100%', gap: '1px', background: 'rgba(245,245,247,0.1)', borderRadius: '18px', overflow: 'hidden', border: '0.5px solid rgba(245,245,247,0.1)' }}>
          {[
            { tag: 'Starter', amt: '₹4,999', per: 'per month', feats: ['1 channel (WhatsApp or chat)','Full Niquo simulation demo','Objection handling included','500 conversations / month','Email support'], cta: 'Try free demo', href: '#demo', ghost: true, note: 'No signup needed to try.' },
            { tag: 'Growth',  amt: 'Custom',  per: 'talk to us', feats: ['All channels — WhatsApp, chat, calls','CRM + calendar integration','Custom qualification playbooks','Unlimited conversations','Dedicated onboarding support'], cta: 'Talk to the team', href: 'https://unicostudios.in', ghost: false, note: 'For teams doing serious volume.' },
          ].map((p, i) => (
            <div key={i} style={{ background: i === 0 ? C.black2 : C.black3, padding: '44px 40px', textAlign: 'left' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: C.gray, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px', display: 'block', fontFamily: C.sf }}>{p.tag}</span>
              <div style={{ fontFamily: C.sf, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.04em', color: C.white, lineHeight: 1, marginBottom: '4px' }}>{p.amt}</div>
              <span style={{ fontSize: '14px', fontWeight: 300, color: C.gray, marginBottom: '28px', display: 'block', fontFamily: C.sf }}>{p.per}</span>
              <div style={{ height: '0.5px', background: 'rgba(245,245,247,0.1)', marginBottom: '24px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {p.feats.map((f) => (
                  <div key={f} style={{ fontSize: '14px', fontWeight: 300, color: '#86868b', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5, fontFamily: C.sf }}>
                    <span style={{ color: C.green, fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <a href={p.href} style={{ display: 'inline-block', background: p.ghost ? 'transparent' : C.blue, color: p.ghost ? C.blue2 : C.white, fontSize: '14px', fontWeight: 400, padding: '10px 22px', borderRadius: '980px', border: p.ghost ? `0.5px solid rgba(41,151,255,0.4)` : 'none', textDecoration: 'none', fontFamily: C.sf, letterSpacing: '-0.01em' }}>{p.cta}</a>
              <p style={{ fontSize: '12px', color: C.gray, marginTop: '12px', lineHeight: 1.5, fontFamily: C.sf }}>{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ ...section(C.black), minHeight: '70vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 80%,rgba(80,80,120,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <p className="nq-sr" style={eyebrow}>Get started today</p>
        <h2 className="nq-sr nq-d1" style={bigH('clamp(36px,6vw,80px)')}>Your leads deserve<br />a better answer.</h2>
        <p className="nq-sr nq-d2" style={{ ...subText, marginBottom: '40px', marginTop: '12px' }}>Try Niquo free. Paste your URL. See it sell your business in 60 seconds.</p>
        <div className="nq-sr nq-d3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#demo" style={{ background: C.blue, color: C.white, fontSize: '17px', fontWeight: 400, padding: '13px 28px', borderRadius: '980px', textDecoration: 'none', fontFamily: C.sf, letterSpacing: '-0.01em', display: 'inline-block' }}>Watch the demo</a>
          <a href="https://unicostudios.in" style={{ fontSize: '17px', fontWeight: 400, color: C.blue2, textDecoration: 'none', fontFamily: C.sf, letterSpacing: '-0.01em' }}>Talk to the team ›</a>
        </div>
        <p className="nq-sr nq-d4" style={{ marginTop: '24px', fontSize: '13px', color: C.gray, fontFamily: C.sf }}>Starting from ₹4,999/month · Built by Unico Studios, Bangalore · India</p>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.black2, borderTop: '0.5px solid rgba(245,245,247,0.1)', padding: '20px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: C.brand, fontSize: '17px', fontWeight: 300, color: C.white, letterSpacing: '2px', textDecoration: 'none' }}>niquo</Link>
        <div style={{ display: 'flex', gap: '28px' }}>
          {[['Unico Studios','https://unicostudios.in'],['© 2026','#']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: '12px', color: C.gray, textDecoration: 'none', fontFamily: C.sf }}>{label}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
