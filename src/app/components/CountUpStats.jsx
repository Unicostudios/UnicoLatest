'use client';

// PATH: src/app/components/CountUpStats.jsx
// FIX: Stats were showing blank "+". Now uses hardcoded real numbers
// with count-up animation. They ALWAYS show — never blank.

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 15,  suffix: '+', label: 'Brands Transformed'  },
  { value: 23,  suffix: '+', label: 'Projects Completed'   },
  { value: 4,   suffix: '',  label: 'Countries Served'     },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, start }) {
  const count = useCountUp(value, 1600, start);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(36px, 5vw, 56px)',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: '13px',
        fontWeight: 300,
        color: '#444',
        letterSpacing: '0.3px',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </div>
    </div>
  );
}

export default function CountUpStats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@300;400&display=swap');
      `}</style>
      <section
        ref={ref}
        style={{
          background: '#080808',
          padding: '64px 24px',
          borderTop: '0.5px solid #111',
          borderBottom: '0.5px solid #111',
        }}
      >
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          alignItems: 'center',
        }}>
          {STATS.map((s, i) => (
            <StatItem key={i} {...s} start={started} />
          ))}
        </div>
      </section>
    </>
  );
}
