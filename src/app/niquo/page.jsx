'use client';

import { useEffect, useRef, useState } from 'react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Parse PROSPECT: / NIQUO: lines from simulation reply ──────────────────
function parseSimulation(reply) {
  const lines = reply.split('\n');
  const messages = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('PROSPECT:')) {
      if (current) messages.push(current);
      current = { r: 'p', t: trimmed.replace('PROSPECT:', '').trim() };
    } else if (trimmed.startsWith('NIQUO:')) {
      if (current) messages.push(current);
      current = { r: 'n', t: trimmed.replace('NIQUO:', '').trim() };
    } else if (trimmed === 'END_SIMULATION') {
      break;
    } else if (current && trimmed) {
      current.t += ' ' + trimmed;
    }
  }
  if (current) messages.push(current);
  return messages;
}

// ── Neural canvas hook ─────────────────────────────────────────────────────
function useNeuralCanvas(canvasRef, heroRef) {
  const mouseRef = useRef({ x: -999, y: -999 });
  const ptsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      buildPts();
    }

    function buildPts() {
      const W = canvas.width;
      const H = canvas.height;
      const count = Math.floor((W * H) / 14000);
      ptsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.2,
        baseAlpha: 0.1 + Math.random() * 0.2,
      }));
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      const pts = ptsRef.current;
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const glow = dm < 120 ? (1 - dm / 120) * 0.45 : 0;
        const alpha = Math.min(1, p.baseAlpha + glow);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,237,228,${alpha.toFixed(3)})`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(242,237,228,${((1 - d / 110) * 0.055).toFixed(3)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -999, y: -999 };
    }

    window.addEventListener('resize', resize);
    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, heroRef]);
}

// ── Demo feed component ────────────────────────────────────────────────────
const SCENARIO_TRIGGERS = {
  Skeptic:    'SIMULATE_SCENARIO SKEPTIC',
  Angry:      'SIMULATE_SCENARIO ANGRY',
  Price:      'SIMULATE_SCENARIO PRICE',
  Competitor: 'SIMULATE_SCENARIO COMPETITOR',
  Almost:     'SIMULATE_SCENARIO ALMOST',
  Ghost:      'SIMULATE_SCENARIO GHOSTER',
};

function DemoFeed() {
  const [messages, setMessages] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [typing, setTyping] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [confirmedUrl, setConfirmedUrl] = useState(null);
  const feedRef = useRef(null);
  const abortRef = useRef(false);
  const historyRef = useRef([]);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages, typing]);

  // Stream parsed simulation messages word by word
  async function streamMessages(msgs) {
    for (const m of msgs) {
      if (abortRef.current) break;
      const isP = m.r === 'p';

      setTyping(true);
      await sleep(isP ? 900 : 1500);
      if (abortRef.current) break;
      setTyping(false);

      let built = '';
      const words = m.t.split(' ');
      // Add empty bubble first
      setMessages((prev) => [...prev, { role: m.r, text: '', partial: true }]);

      for (const w of words) {
        if (abortRef.current) break;
        built += (built ? ' ' : '') + w;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: m.r, text: built, partial: true };
          return copy;
        });
        await sleep(isP ? 50 : 68);
      }

      // Lock message in
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: m.r, text: built, partial: false };
        return copy;
      });

      await sleep(isP ? 400 : 600);
    }
  }

  async function callNiquo(message, currentConfirmedUrl) {
    if (isRunning) return;
    abortRef.current = false;
    setIsRunning(true);
    setError('');
    setMessages([]);
    historyRef.current = [];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: historyRef.current,
          mode: 'niquo',
          email: 'demo@niquo.ai',
          uploadedContent: null,
          confirmedUrl: currentConfirmedUrl || null,
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const reply = data.reply || '';

      // Parse PROSPECT: / NIQUO: lines
      const parsed = parseSimulation(reply);

      if (parsed.length > 0) {
        await streamMessages(parsed);
      } else {
        // Fallback: show raw reply as Niquo message
        await streamMessages([{ r: 'n', t: reply }]);
      }

      // Save to history for scenario chaining
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: message },
        { role: 'assistant', content: reply },
      ];

    } catch (err) {
      setError('Something went wrong. Make sure you\'re on unicostudios.in and try again.');
    } finally {
      setIsRunning(false);
      setTyping(false);
    }
  }

  function handleRun() {
    if (!url.trim()) {
      setError('Enter your website URL or company name first.');
      return;
    }
    setError('');
    // Normalise URL
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;
    setConfirmedUrl(cleanUrl);
    // Trigger simulation — Niquo reads the URL and runs both sides
    callNiquo(cleanUrl, cleanUrl);
  }

  function handleScenario(scenarioKey) {
    if (!confirmedUrl) {
      setError('Run the main demo first so Niquo knows your business.');
      return;
    }
    callNiquo(SCENARIO_TRIGGERS[scenarioKey], confirmedUrl);
  }

  return (
    <div className="demo-shell">
      <div className="demo-chrome">
        <div className="chrome-dots">
          <div className="chrome-dot cd1" />
          <div className="chrome-dot cd2" />
          <div className="chrome-dot cd3" />
        </div>
        <div className="chrome-url">
          {confirmedUrl ? confirmedUrl : 'unicostudios.in/niquo — live demo'}
        </div>
      </div>
      <div className="demo-split">
        <div className="demo-controls">
          <div>
            <span className="ctrl-label">your business</span>
            <input
              className="ctrl-input"
              type="text"
              placeholder="yourwebsite.com"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleRun()}
            />
          </div>
          {error && (
            <p style={{ fontSize: '11px', color: 'rgba(255,100,100,0.8)', marginTop: '-12px', lineHeight: 1.5 }}>
              {error}
            </p>
          )}
          <button className="ctrl-run" onClick={handleRun} disabled={isRunning}>
            {isRunning ? 'Niquo is thinking…' : 'Run simulation'}
          </button>
          <div className="ctrl-divider">scenarios</div>
          <div className="scenario-list">
            {Object.keys(SCENARIO_TRIGGERS).map((s) => (
              <button
                key={s}
                className="scen"
                onClick={() => handleScenario(s)}
                disabled={isRunning}
                title={!confirmedUrl ? 'Run the main demo first' : ''}
              >
                {s === 'Skeptic'    && 'The Skeptic'}
                {s === 'Angry'      && 'The Angry Lead'}
                {s === 'Price'      && 'Price Objection'}
                {s === 'Competitor' && 'Competitor Battle'}
                {s === 'Almost'     && 'Almost Closed'}
                {s === 'Ghost'      && 'The Ghost'}
              </button>
            ))}
          </div>
          {confirmedUrl && (
            <p style={{ fontSize: '10px', color: 'var(--muted2)', letterSpacing: '0.5px', lineHeight: 1.6 }}>
              Niquo is selling for<br />
              <span style={{ color: 'var(--muted)' }}>{confirmedUrl}</span>
            </p>
          )}
        </div>
        <div className="demo-feed" ref={feedRef}>
          {messages.length === 0 && !typing && !isRunning && (
            <div className="feed-empty">
              Enter your website above.<br />
              Watch Niquo sell your business.
            </div>
          )}
          {isRunning && messages.length === 0 && (
            <div className="feed-empty" style={{ flexDirection: 'column', gap: '12px' }}>
              <div className="typing-row" style={{ justifyContent: 'center' }}>
                <div className="ty" /><div className="ty" /><div className="ty" />
              </div>
              <span>Reading your business…</span>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className="msg-group">
              <div className={`msg-sender ${m.role}`}>
                {m.role === 'p' ? 'PROSPECT' : 'NIQUO'}
              </div>
              <div className={`msg-bubble ${m.role}`}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="typing-row">
              <div className="ty" /><div className="ty" /><div className="ty" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function NiquoPage() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  useNeuralCanvas(canvasRef, heroRef);

  const tickerItems = ['WhatsApp', 'HubSpot', 'Salesforce', 'Calendly', 'Slack', 'Zoom', 'Google Ads', 'Meta Ads', 'Interakt', 'Wati'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&family=Comfortaa:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #080809;
          --black2: #0e0e10;
          --black3: #141416;
          --off-white: #F2EDE4;
          --muted: rgba(242,237,228,0.38);
          --muted2: rgba(242,237,228,0.18);
          --muted3: rgba(242,237,228,0.08);
          --border: rgba(242,237,228,0.07);
          --border2: rgba(242,237,228,0.12);
          --serif: 'Instrument Serif', Georgia, serif;
          --sans: 'Geist', system-ui, sans-serif;
          --brand: 'Comfortaa', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--black);
          color: var(--off-white);
          font-family: var(--sans);
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        .niquo-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 56px; height: 64px;
          border-bottom: 0.5px solid var(--border);
          background: rgba(8,8,9,0.92);
          backdrop-filter: blur(20px);
          position: sticky; top: 0; z-index: 50;
        }
        .niquo-logo {
          font-family: var(--brand);
          font-size: 20px; font-weight: 300;
          color: var(--off-white);
          letter-spacing: 2px;
          text-decoration: none;
        }
        .nav-right { display: flex; align-items: center; gap: 40px; }
        .nav-link {
          font-size: 13px; font-weight: 300;
          color: var(--muted); text-decoration: none;
          transition: color 0.2s; letter-spacing: 0.2px;
        }
        .nav-link:hover { color: var(--off-white); }
        .nav-cta {
          font-size: 13px; font-weight: 400;
          color: var(--off-white); background: transparent;
          border: 0.5px solid var(--border2);
          padding: 8px 20px; border-radius: 4px;
          cursor: pointer; text-decoration: none;
          transition: background 0.2s;
        }
        .nav-cta:hover { background: var(--muted3); }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; padding: 0 56px;
          overflow: hidden; background: var(--black);
        }
        .hero-canvas-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-canvas-bg canvas { width: 100%; height: 100%; }
        .hero-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 200px;
          background: linear-gradient(transparent, var(--black));
          z-index: 1; pointer-events: none;
        }
        .hero-left { position: relative; z-index: 2; padding: 120px 0 100px; }
        .hero-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 48px; }
        .eyebrow-line { width: 28px; height: 0.5px; background: var(--muted); }
        .eyebrow-text {
          font-size: 11px; font-weight: 300; color: var(--muted);
          letter-spacing: 2.5px; text-transform: uppercase;
        }
        .hero-h1 {
          font-family: var(--serif);
          font-size: clamp(48px, 5.5vw, 78px);
          font-weight: 400; line-height: 1.05;
          letter-spacing: -1.5px; margin-bottom: 32px;
          color: var(--off-white);
        }
        .hero-h1 em { font-style: italic; color: rgba(242,237,228,0.5); }
        .hero-sub {
          font-size: 15px; font-weight: 300; color: var(--muted);
          max-width: 380px; line-height: 1.8; margin-bottom: 56px;
        }
        .hero-actions { display: flex; align-items: center; gap: 24px; }
        .btn-primary {
          background: var(--off-white); color: var(--black);
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          padding: 12px 28px; border-radius: 4px; border: none;
          cursor: pointer; text-decoration: none; transition: opacity 0.2s;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.88; }
        .btn-ghost {
          font-size: 13px; font-weight: 300; color: var(--muted);
          text-decoration: none; transition: color 0.2s;
        }
        .btn-ghost:hover { color: var(--off-white); }
        .hero-right {
          position: relative; z-index: 2; padding: 120px 0 100px;
          display: flex; justify-content: flex-end; align-items: center;
        }
        .hero-stat-stack {
          display: flex; flex-direction: column;
          border-left: 0.5px solid var(--border); padding-left: 48px;
        }
        .hero-stat { padding: 28px 0; border-bottom: 0.5px solid var(--border); }
        .hero-stat:last-child { border-bottom: none; }
        .stat-big {
          font-family: var(--serif); font-size: 52px; font-weight: 400;
          color: var(--off-white); line-height: 1; letter-spacing: -2px;
          display: block; margin-bottom: 6px;
        }
        .stat-label {
          font-size: 12px; font-weight: 300; color: var(--muted);
          letter-spacing: 0.5px; display: block;
        }

        /* TICKER */
        .ticker {
          border-top: 0.5px solid var(--border);
          border-bottom: 0.5px solid var(--border);
          padding: 14px 0; overflow: hidden; background: var(--black2);
        }
        .ticker-track {
          display: flex; gap: 64px; align-items: center;
          animation: tick 30s linear infinite; width: max-content;
        }
        @keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-item {
          font-size: 11px; font-weight: 300; color: var(--muted2);
          letter-spacing: 2px; text-transform: uppercase; white-space: nowrap;
        }
        .ticker-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--muted2); flex-shrink: 0; }

        /* MANIFESTO */
        .manifesto { padding: 160px 56px; max-width: 900px; }
        .manifesto-text {
          font-family: var(--serif);
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 400; line-height: 1.35; letter-spacing: -0.8px;
          color: var(--off-white);
        }
        .manifesto-text em { font-style: italic; color: var(--muted); }
        .manifesto-source { margin-top: 48px; display: flex; align-items: center; gap: 16px; }
        .manifesto-line { width: 32px; height: 0.5px; background: var(--muted2); }
        .manifesto-caption {
          font-size: 12px; font-weight: 300; color: var(--muted2);
          letter-spacing: 1px; text-transform: uppercase;
        }

        /* WHAT */
        .what {
          padding: 0 56px 160px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 120px; align-items: start; max-width: 1100px;
        }
        .what-left { position: sticky; top: 80px; }
        .what-label {
          font-size: 11px; font-weight: 300; color: var(--muted2);
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 28px;
        }
        .what-title {
          font-family: var(--serif);
          font-size: clamp(32px, 3vw, 48px);
          font-weight: 400; line-height: 1.1; letter-spacing: -1px;
          color: var(--off-white); margin-bottom: 20px;
        }
        .what-title em { font-style: italic; color: var(--muted); }
        .what-body {
          font-size: 14px; font-weight: 300; color: var(--muted);
          line-height: 1.85; max-width: 320px;
        }
        .what-right { display: flex; flex-direction: column; }
        .capability { padding: 36px 0; border-bottom: 0.5px solid var(--border); }
        .capability:first-child { padding-top: 0; }
        .cap-num {
          font-size: 11px; font-weight: 300; color: var(--muted2);
          letter-spacing: 1.5px; margin-bottom: 14px; display: block;
        }
        .cap-title {
          font-family: var(--serif); font-size: 22px; font-weight: 400;
          color: var(--off-white); letter-spacing: -0.3px;
          margin-bottom: 10px; line-height: 1.2;
        }
        .cap-desc { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.8; }

        /* HOW */
        .how { padding: 0 56px 160px; max-width: 1100px; }
        .how-header { margin-bottom: 80px; }
        .how-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          border-top: 0.5px solid var(--border);
        }
        .how-step { padding: 48px 32px 48px 0; border-right: 0.5px solid var(--border); }
        .how-step:last-child { border-right: none; padding-right: 0; }
        .how-step:not(:first-child) { padding-left: 32px; }
        .hn {
          font-family: var(--serif); font-style: italic;
          font-size: 13px; color: var(--muted2); margin-bottom: 20px; display: block;
        }
        .ht {
          font-family: var(--serif); font-size: 20px; font-weight: 400;
          color: var(--off-white); letter-spacing: -0.3px;
          margin-bottom: 12px; line-height: 1.2;
        }
        .hd { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.8; }

        /* DEMO */
        .demo-section { padding: 0 56px 160px; max-width: 1100px; }
        .demo-header {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; margin-bottom: 72px; align-items: end;
        }
        .demo-title {
          font-family: var(--serif);
          font-size: clamp(32px, 3vw, 48px);
          font-weight: 400; line-height: 1.1;
          letter-spacing: -1px; color: var(--off-white);
        }
        .demo-title em { font-style: italic; color: var(--muted); }
        .demo-desc { font-size: 14px; font-weight: 300; color: var(--muted); line-height: 1.85; }
        .demo-shell {
          background: var(--black2); border: 0.5px solid var(--border);
          border-radius: 8px; overflow: hidden;
        }
        .demo-chrome {
          background: var(--black3); border-bottom: 0.5px solid var(--border);
          padding: 12px 20px; display: flex; align-items: center; gap: 12px;
        }
        .chrome-dots { display: flex; gap: 6px; }
        .chrome-dot { width: 10px; height: 10px; border-radius: 50%; }
        .cd1 { background: #ff5f57; }
        .cd2 { background: #febc2e; }
        .cd3 { background: #28c840; }
        .chrome-url {
          flex: 1; font-size: 11px; font-weight: 300; color: var(--muted2);
          background: var(--muted3); border: 0.5px solid var(--border);
          border-radius: 3px; padding: 4px 12px;
        }
        .demo-split {
          display: grid; grid-template-columns: 260px 1fr; min-height: 520px;
        }
        .demo-controls {
          border-right: 0.5px solid var(--border);
          padding: 32px 28px; display: flex; flex-direction: column; gap: 24px;
        }
        .ctrl-label {
          font-size: 10px; font-weight: 300; color: var(--muted2);
          letter-spacing: 2px; text-transform: uppercase;
          display: block; margin-bottom: 10px;
        }
        .ctrl-input {
          width: 100%; background: var(--muted3);
          border: 0.5px solid var(--border); border-radius: 4px;
          padding: 10px 14px; color: var(--off-white);
          font-family: var(--sans); font-size: 13px; font-weight: 300;
          outline: none; transition: border-color 0.2s;
        }
        .ctrl-input:focus { border-color: var(--border2); }
        .ctrl-input::placeholder { color: var(--muted2); }
        .ctrl-run {
          width: 100%; background: var(--off-white); color: var(--black);
          font-family: var(--sans); font-size: 12px; font-weight: 500;
          letter-spacing: 0.5px; padding: 10px; border-radius: 4px;
          border: none; cursor: pointer; transition: opacity 0.2s;
        }
        .ctrl-run:hover:not(:disabled) { opacity: 0.88; }
        .ctrl-run:disabled { opacity: 0.5; cursor: not-allowed; }
        .ctrl-divider {
          display: flex; align-items: center; gap: 10px; color: var(--muted2);
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 300;
        }
        .ctrl-divider::before, .ctrl-divider::after {
          content: ''; flex: 1; height: 0.5px; background: var(--border);
        }
        .scenario-list { display: flex; flex-direction: column; gap: 6px; }
        .scen {
          background: transparent; border: 0.5px solid var(--border);
          border-radius: 3px; padding: 8px 12px; color: var(--muted);
          font-family: var(--sans); font-size: 12px; font-weight: 300;
          cursor: pointer; text-align: left; transition: all 0.2s;
        }
        .scen:hover:not(:disabled) { border-color: var(--border2); color: var(--off-white); background: var(--muted3); }
        .scen:disabled { opacity: 0.4; cursor: not-allowed; }
        .demo-feed {
          padding: 32px 28px; overflow-y: auto; max-height: 520px;
          display: flex; flex-direction: column;
        }
        .msg-group { margin-bottom: 20px; animation: msgIn 0.3s ease both; }
        @keyframes msgIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        .msg-sender {
          font-size: 9px; font-weight: 400; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .msg-sender.p { color: rgba(242,180,80,0.6); }
        .msg-sender.n { color: rgba(180,175,255,0.6); }
        .msg-bubble {
          display: inline-block; max-width: 88%;
          padding: 10px 16px; border-radius: 2px 8px 8px 8px;
          font-size: 13px; font-weight: 300; line-height: 1.65;
        }
        .msg-bubble.p { background: rgba(242,180,80,0.06); border: 0.5px solid rgba(242,180,80,0.12); color: var(--off-white); }
        .msg-bubble.n { background: rgba(180,175,255,0.06); border: 0.5px solid rgba(180,175,255,0.12); color: var(--off-white); }
        .typing-row { display: flex; gap: 4px; padding: 10px 16px; margin-bottom: 20px; }
        .ty { width: 4px; height: 4px; border-radius: 50%; background: var(--muted2); animation: ty 1.1s infinite; }
        .ty:nth-child(2) { animation-delay: 0.18s; }
        .ty:nth-child(3) { animation-delay: 0.36s; }
        @keyframes ty { 0%,70%,100%{transform:translateY(0)} 35%{transform:translateY(-4px)} }
        .feed-empty {
          flex: 1; display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 300; color: var(--muted2);
          text-align: center; line-height: 2;
        }

        /* CTA */
        .close-section { padding: 0 56px 200px; max-width: 800px; }
        .close-label {
          font-size: 11px; font-weight: 300; color: var(--muted2);
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 40px;
          display: flex; align-items: center; gap: 16px;
        }
        .close-label::after { content: ''; width: 32px; height: 0.5px; background: var(--muted2); }
        .close-h {
          font-family: var(--serif);
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 400; line-height: 1.05; letter-spacing: -2px;
          color: var(--off-white); margin-bottom: 32px;
        }
        .close-h em { font-style: italic; color: var(--muted); }
        .close-sub {
          font-size: 15px; font-weight: 300; color: var(--muted);
          line-height: 1.8; max-width: 480px; margin-bottom: 52px;
        }
        .close-actions { display: flex; align-items: center; gap: 28px; }
        .close-note { margin-top: 28px; font-size: 12px; font-weight: 300; color: var(--muted2); }

        /* FOOTER */
        .niquo-footer {
          border-top: 0.5px solid var(--border);
          padding: 40px 56px; display: flex; align-items: center; justify-content: space-between;
        }
        .f-right { display: flex; align-items: center; gap: 40px; }
        .f-link {
          font-size: 12px; font-weight: 300; color: var(--muted2);
          text-decoration: none; transition: color 0.2s;
        }
        .f-link:hover { color: var(--off-white); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .niquo-nav { padding: 0 24px; }
          .nav-right .nav-link { display: none; }
          .hero { grid-template-columns: 1fr; padding: 0 24px; }
          .hero-right { display: none; }
          .manifesto { padding: 80px 24px; }
          .what { grid-template-columns: 1fr; padding: 0 24px 80px; gap: 48px; }
          .what-left { position: static; }
          .how { padding: 0 24px 80px; }
          .how-grid { grid-template-columns: 1fr 1fr; }
          .demo-section { padding: 0 24px 80px; }
          .demo-header { grid-template-columns: 1fr; gap: 24px; }
          .demo-split { grid-template-columns: 1fr; }
          .demo-controls { border-right: none; border-bottom: 0.5px solid var(--border); }
          .close-section { padding: 0 24px 100px; }
          .niquo-footer { padding: 32px 24px; flex-direction: column; gap: 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="niquo-nav">
        <a href="#top" className="niquo-logo">niquo</a>
        <div className="nav-right">
          <a href="#what" className="nav-link">product</a>
          <a href="#how" className="nav-link">process</a>
          <a href="#demo" className="nav-link">demo</a>
          <a href="#close" className="nav-cta">get access</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-canvas-bg">
          <canvas ref={canvasRef} />
        </div>
        <div className="hero-fade" />
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">AI sales agent · 2026</span>
          </div>
          <h1 className="hero-h1">
            The salesperson<br />
            that never<br />
            <em>sleeps.</em>
          </h1>
          <p className="hero-sub">
            Niquo engages every lead the moment they appear — qualifying, following up, handling objections — across WhatsApp, chat, and calls.
          </p>
          <div className="hero-actions">
            <a href="#demo" className="btn-primary">See it work</a>
            <a href="#what" className="btn-ghost">How it works →</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-stat-stack">
            <div className="hero-stat">
              <span className="stat-big">60s</span>
              <span className="stat-label">From URL to first result</span>
            </div>
            <div className="hero-stat">
              <span className="stat-big">24/7</span>
              <span className="stat-label">No lead ever goes cold</span>
            </div>
            <div className="hero-stat">
              <span className="stat-big">12+</span>
              <span className="stat-label">Industries. One agent.</span>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <div className="manifesto">
        <p className="manifesto-text">
          Every lead that goes cold is revenue you already earned — and lost.
          Niquo exists to close that gap. <em>Not with automation. With intelligence.</em>
        </p>
        <div className="manifesto-source">
          <div className="manifesto-line" />
          <span className="manifesto-caption">Unico Studios · Bangalore</span>
        </div>
      </div>

      {/* WHAT */}
      <div className="what" id="what">
        <div className="what-left">
          <div className="what-label">The product</div>
          <h2 className="what-title">Not a chatbot.<br /><em>A closer.</em></h2>
          <p className="what-body">
            Niquo reads your business, learns your pitch, and handles every conversation like your best salesperson — except it works at 2am and never misses a follow-up.
          </p>
        </div>
        <div className="what-right">
          {[
            { n: '01', t: 'Reads your business in 60 seconds', d: 'Give Niquo a URL. It understands your offer, your pricing, your tone — and deploys as a version of your best rep, instantly.' },
            { n: '02', t: 'Handles every objection cold', d: 'Price sensitivity, skeptics, competitor comparisons, ghost leads — Niquo has a response calibrated to your business for every scenario.' },
            { n: '03', t: "Speaks your customer's language", d: 'Hindi, Tamil, Kannada, Hinglish, English — Niquo mirrors the language and tone of the lead in real time, without being asked.' },
            { n: '04', t: 'Works every channel at once', d: 'WhatsApp, website chat, phone calls — one Niquo, everywhere your leads appear. Conversations sync to your CRM automatically.' },
          ].map((c) => (
            <div key={c.n} className="capability">
              <span className="cap-num">{c.n}</span>
              <div className="cap-title">{c.t}</div>
              <p className="cap-desc">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW */}
      <div className="how" id="how">
        <div className="how-header">
          <div className="what-label">The process</div>
          <h2 className="what-title" style={{ maxWidth: '440px' }}>
            From URL to live agent.<br /><em>Faster than hiring.</em>
          </h2>
        </div>
        <div className="how-grid">
          {[
            { n: 'one', t: 'Share your URL', d: 'Niquo reads your site — product, pricing, tone — and builds your agent from scratch.' },
            { n: 'two', t: 'We configure everything', d: 'Qualification rules, objection playbooks, follow-up cadences — all tuned to your exact business.' },
            { n: 'three', t: 'Go live', d: 'Niquo deploys on your chosen channels. No long contracts, no engineering required.' },
            { n: 'four', t: 'You only close', d: 'Hot leads land in your CRM. You talk only to people who are ready to buy.' },
          ].map((s) => (
            <div key={s.n} className="how-step">
              <span className="hn">{s.n}</span>
              <div className="ht">{s.t}</div>
              <p className="hd">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DEMO */}
      <div className="demo-section" id="demo">
        <div className="demo-header">
          <h2 className="demo-title">
            Watch Niquo sell<br /><em>your</em> business.
          </h2>
          <p className="demo-desc">
            Enter your URL and watch a full sales simulation play out automatically — both sides. Or pick a scenario and see how Niquo handles the hard ones.
          </p>
        </div>
        <DemoFeed />
      </div>

      {/* CTA */}
      <div className="close-section" id="close">
        <div className="close-label">Get started</div>
        <h2 className="close-h">
          Your leads deserve<br />a better<br /><em>answer.</em>
        </h2>
        <p className="close-sub">
          Try Niquo free — see exactly how it would handle a real lead for your business. No signup. No friction. Just the demo.
        </p>
        <div className="close-actions">
          <a href="#demo" className="btn-primary">Watch the demo</a>
          <a href="https://unicostudios.in" className="btn-ghost">Talk to the team →</a>
        </div>
        <p className="close-note">Starting from ₹4,999/month when you deploy · Built by Unico Studios, Bangalore</p>
      </div>

      {/* FOOTER */}
      <footer className="niquo-footer">
        <a href="#top" className="niquo-logo">niquo</a>
        <div className="f-right">
          <a href="https://unicostudios.in" className="f-link">Unico Studios</a>
          <a href="#" className="f-link">Privacy</a>
          <span className="f-link">© 2026</span>
        </div>
      </footer>
    </>
  );
}
