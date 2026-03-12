// src/components/CoreSpinLoader.jsx
import React, { useState, useEffect, useRef } from 'react';

export function CoreSpinLoader({ onComplete }) {
  const [loadingText, setLoadingText] = useState('Booting Neural Core');
  const [progress, setProgress]       = useState(0); // 0–1
  const startTime = useRef(Date.now());

  // ── Simulated progress — smooth 0→1 over ~2 s ────────────────────────────
  useEffect(() => {
    const DURATION = 2000; // ms
    let rafId;

    function tick() {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min(elapsed / DURATION, 1);
      setProgress(pct);

      if (pct < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Text cycling — driven by progress ─────────────────────────────────────
  useEffect(() => {
    const states = [
      'Booting Neural Core',
      'Training AI Models..',
      'Calibrating Neurons..',
      'Loading Knowledge Base..',
      'Syncing Intelligence..',
      'AI Engine Ready.',
    ];

    const idx = Math.min(
      Math.floor(progress * states.length),
      states.length - 1
    );
    setLoadingText(states[idx]);
  }, [progress]);

  // ── Dismiss when progress reaches 100 % ───────────────────────────────────
  useEffect(() => {
    if (progress < 1) return;
    const t = setTimeout(() => { onComplete?.(); }, 300);
    return () => clearTimeout(t);
  }, [progress, onComplete]);

  const pct = Math.round(progress * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-6 md:gap-8">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center transition-all duration-300">

        {/* Base Glow */}
        <div className="absolute inset-0 rounded-full blur-xl animate-pulse
          bg-[var(--color-primary)]/15" />

        {/* Outer Dashed Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed
          border-[var(--color-primary)]/40
          animate-[spin_10s_linear_infinite]" />

        {/* Main Arc */}
        <div className="absolute inset-1 rounded-full border-2 border-transparent
          border-t-[var(--color-primary)]
          shadow-[0_0_6px_rgba(var(--primary-rgb),0.5)]
          animate-[spin_2s_linear_infinite]" />

        {/* Reverse Arc */}
        <div className="absolute inset-3 rounded-full border-2 border-transparent
          border-b-[var(--color-primary-dark)]
          shadow-[0_0_6px_rgba(var(--primary-rgb),0.4)]
          animate-[spin_3s_linear_infinite_reverse]" />

        {/* Inner Fast Ring */}
        <div className="absolute inset-4 sm:inset-5 rounded-full border border-transparent
          border-l-[var(--color-primary-light)]/60
          animate-[spin_1s_ease-in-out_infinite]" />

        {/* Orbital Dot */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2
            w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
            bg-[var(--color-primary)]
            shadow-[0_0_4px_rgba(var(--primary-rgb),0.9)]" />
        </div>

        {/* Center Core */}
        <div className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse
          bg-[var(--color-primary)]
          shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)]" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2">
        <span
          key={loadingText}
          className="text-caption sm:text-sm md:text-base font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase
            text-[var(--color-primary)]
            animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {loadingText}
        </span>

        {/* Progress bar */}
        <div style={{
          width: 120,
          height: 2,
          background: 'rgba(214,79,217,0.15)',
          borderRadius: 2,
          overflow: 'hidden',
          marginTop: 4,
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))',
            borderRadius: 2,
            transition: 'width 0.3s ease',
            boxShadow: '0 0 6px rgba(214,79,217,0.6)',
          }} />
        </div>
      </div>
    </div>
  );
}

export default CoreSpinLoader;