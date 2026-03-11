import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Code2, Users, Brain, Rocket, Building2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// ── SVG coordinate system ────────────────────────────────────────────────────
const VW = 1100, VH = 460;
const INPUT_W = 210, INPUT_H = 64;
const ENGINE_W = 178, ENGINE_H = 144;
const OUTPUT_W = 210, OUTPUT_H = 64;

const IX  = 28;
const EX  = (VW - ENGINE_W) / 2;   // ~461
const OX  = VW - OUTPUT_W - 28;    // ~862
const JLX = EX - 92;               // left junction  ~369
const JRX = EX + ENGINE_W + 92;    // right junction ~731

const INY  = [VH * 0.17, VH * 0.50, VH * 0.83];
const ECY  = VH / 2;
const OUTY = [VH * 0.30, VH * 0.72];

const inPortX  = IX + INPUT_W;
const engLX    = EX;
const engRX    = EX + ENGINE_W;
const outPortX = OX;

// Smooth cubic bezier S-curve
const cb = (x1, y1, x2, y2, t = 0.45) => {
  const dx = (x2 - x1) * t;
  return `M ${x1} ${y1} C ${x1+dx} ${y1} ${x2-dx} ${y2} ${x2} ${y2}`;
};

const WIRES = [
  { id: 'w0', d: cb(inPortX, INY[0], JLX, ECY) },
  { id: 'w1', d: cb(inPortX, INY[1], JLX, ECY) },
  { id: 'w2', d: cb(inPortX, INY[2], JLX, ECY) },
  { id: 'w3', d: `M ${JLX} ${ECY} L ${engLX} ${ECY}` },
  { id: 'w4', d: `M ${engRX} ${ECY} L ${JRX} ${ECY}` },
  { id: 'w5', d: cb(JRX, ECY, outPortX, OUTY[0]) },
  { id: 'w6', d: cb(JRX, ECY, outPortX, OUTY[1]) },
];

// Two staggered dots per wire
const DOTS = [
  ['w0',0.0,2.5],['w0',1.25,2.5],
  ['w1',0.4,2.3],['w1',1.55,2.3],
  ['w2',0.8,2.7],['w2',2.15,2.7],
  ['w3',0.2,1.1],['w3',1.30,1.1],
  ['w4',0.15,1.0],['w4',1.15,1.0],
  ['w5',0.5,2.4],['w5',1.70,2.4],
  ['w6',0.9,2.6],['w6',2.20,2.6],
];

// ── Animated dot that travels along a wire path ──────────────────────────────
function FlowDot({ wireId, delay, duration, theme }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const t0  = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = document.getElementById(wireId);
    const dot  = ref.current;
    if (!path || !dot) return;
    const len = path.getTotalLength();
    let dead = false;

    function frame(ts) {
      if (dead) return;
      if (!t0.current) t0.current = ts - delay * 1000;
      const p  = (((ts - t0.current) / 1000) % duration) / duration;
      const pt = path.getPointAtLength(p * len);
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
      raf.current = requestAnimationFrame(frame);
    }
    const timer = setTimeout(() => { raf.current = requestAnimationFrame(frame); }, delay * 1000);
    return () => { dead = true; clearTimeout(timer); cancelAnimationFrame(raf.current); };
  }, [wireId, delay, duration]);

  const dotColor = theme === 'dark' ? 'white' : '#d24bd5';
  const shadowColor = theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(214,79,217,0.7)';
  return (
    <circle ref={ref} r="3.2" fill={dotColor} opacity="0.9"
      style={{ filter: `drop-shadow(0 0 5px ${shadowColor})` }} />
  );
}

// ── Scroll-triggered count-up ────────────────────────────────────────────────
function useCountUp(target, active, ms = 1700) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    let id;
    function step(now) {
      const p = Math.min((now - t0) / ms, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) id = requestAnimationFrame(step);
      else setV(target);
    }
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [active, target, ms]);
  return v;
}

function StatCell({ label, value, suffix, active, delay, theme }) {
  const count = useCountUp(value, active);
  return (
    <div style={{
      padding: '1.35rem 0.75rem', textAlign: 'center',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(1.55rem, 2.8vw, 2.1rem)',
        letterSpacing: '0.04em', color: theme === 'dark' ? '#fff' : 'var(--text-heading)', lineHeight: 1, marginBottom: 5,
      }}>{count}{suffix}</div>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.57rem', letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>{label}</div>
    </div>
  );
}

// ── Node shared styles (generator function) ──────────────────────────────────
const getInputNodeStyle = (theme) => ({
  width: '100%', height: '100%',
  background: 'var(--bg-card)',
  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'}`,
  borderRadius: 11,
  display: 'flex', alignItems: 'center',
  gap: 11, padding: '0 13px', boxSizing: 'border-box',
  boxShadow: theme === 'dark' ? 'none' : '0 2px 10px rgba(0,0,0,0.03)'
});
const getIconBoxStyle = (theme) => ({
  width: 38, height: 38, minWidth: 38, borderRadius: 8,
  background: 'var(--bg-secondary)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
});

// ── Main component ───────────────────────────────────────────────────────────
export default function NeuralCareerGraph() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const STATS = [
    { label: 'Year Founded',        value: 2019, suffix: '' },
    { label: 'Students Trained',    value: 1200, suffix: '+' },
    { label: 'Real Projects Built', value: 157,  suffix: '+' },
    { label: 'Hiring Partners',     value: 75,   suffix: '+' },
    { label: 'Avg Trainer Exp',     value: 8,    suffix: '+ Yrs' },
    { label: 'Max Batch Size',      value: 20,   suffix: '' },
    { label: 'Chennai Campuses',    value: 3,    suffix: '' },
    { label: 'Placement Rate',      value: 90,   suffix: '%+' },
  ];

  const INPUTS = [
    { title: 'Curriculum',     sub: 'Industry-Focused', Icon: BookOpen },
    { title: 'Live Projects',  sub: '200+ Real Builds', Icon: Code2    },
    { title: 'Expert Mentors', sub: '8+ Years Exp',     Icon: Users    },
  ];
  const OUTPUTS = [
    { title: 'Career Launch',  sub: '90%+ Placement', Icon: Rocket    },
    { title: 'Hiring Network', sub: '75+ Partners',   Icon: Building2 },
  ];

  const fade = (extra = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.6s ease ${extra}s, transform 0.6s ease ${extra}s`,
  });

  return (
    <section ref={sectionRef} aria-label="Scope AI Hub Learning Pipeline"
      style={{ background: 'var(--bg-secondary)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}
    >

      {/* ── CSS for responsive behaviour ── */}
      <style>{`
        .ncg-desktop { display: block; }
        .ncg-mobile  { display: none; flex-direction: column; }
        .ncg-grid    { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 767px) {
          .ncg-desktop { display: none !important; }
          .ncg-mobile  { display: flex !important; }
          .ncg-grid    { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display:'inline-block', fontFamily:"'DM Mono',monospace",
          fontSize:'0.58rem', letterSpacing:'0.3em', textTransform:'uppercase',
          color: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'var(--text-muted)', marginBottom:'0.9rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.1s' }}>
          How It Works
        </div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",
          fontSize:'clamp(2.1rem,4.5vw,3.1rem)', letterSpacing:'0.05em',
          color: 'var(--text-heading)', lineHeight:1, margin:'0 0 0.55rem', ...fade(0.15) }}>
          The{' '}
          <span style={{ background:'linear-gradient(110deg,#d64fd9,#818cf8)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Scope AI Hub
          </span>{' '}
          Pipeline
        </h2>
        <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:'0.9rem',
          color: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'var(--text-muted)', opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.25s' }}>
          Inputs&nbsp;&nbsp;→&nbsp;&nbsp;Learning Engine&nbsp;&nbsp;→&nbsp;&nbsp;Career Outcomes
        </p>
      </div>

      {/* ══════════════════════════ DESKTOP SVG ══════════════════════════ */}
      <div className="ncg-desktop" style={{ width:'100%', maxWidth:1100, margin:'0 auto',
        opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.35s' }}>
        <svg viewBox={`0 0 ${VW} ${VH}`}
          style={{ width:'100%', height:'auto', display:'block', overflow:'visible' }}
          xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id="ncg-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Wires */}
          {WIRES.map(w => (
            <path key={w.id} id={w.id} d={w.d}
              fill="none" stroke={theme === 'dark' ? "rgba(255,255,255,0.17)" : "rgba(0,0,0,0.12)"}
              strokeWidth="1.5" strokeLinecap="round" />
          ))}

          {/* Flow dots */}
          {visible && (
            <g filter="url(#ncg-glow)">
              {DOTS.map(([wid, dly, dur], i) => (
                <FlowDot key={i} wireId={wid} delay={dly} duration={dur} theme={theme} />
              ))}
            </g>
          )}

          {/* Junction dots */}
          {[JLX, JRX].map((cx, i) => (
            <circle key={i} cx={cx} cy={ECY} r="5.5" fill={theme === 'dark' ? "white" : "var(--accent-primary)"} opacity={theme === 'dark' ? "0.85" : "1"}
              style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 6px rgba(255,255,255,0.7))' : 'drop-shadow(0 0 6px rgba(214,79,217,0.4))' }} />
          ))}

          {/* Input port circles */}
          {INY.map((y, i) => (
            <circle key={i} cx={inPortX} cy={y} r="4.5" fill={theme === 'dark' ? "white" : "var(--accent-primary)"} opacity={theme === 'dark' ? "0.65" : "1"} />
          ))}

          {/* Output port circles */}
          {OUTY.map((y, i) => (
            <circle key={i} cx={outPortX} cy={y} r="4.5" fill={theme === 'dark' ? "white" : "var(--accent-primary)"} opacity={theme === 'dark' ? "0.65" : "1"} />
          ))}

          {/* Engine port bars */}
          <rect x={engLX-2} y={ECY-10} width={4} height={20} rx="2" fill={theme === 'dark' ? "white" : "var(--accent-primary)"} opacity={theme === 'dark' ? "0.7" : "1"} />
          <rect x={engRX-2} y={ECY-10} width={4} height={20} rx="2" fill={theme === 'dark' ? "white" : "var(--accent-primary)"} opacity={theme === 'dark' ? "0.7" : "1"} />

          {/* Input nodes */}
          {INPUTS.map(({ title, sub, Icon }, i) => (
            <foreignObject key={i} x={IX} y={INY[i]-INPUT_H/2} width={INPUT_W} height={INPUT_H}>
              <div style={getInputNodeStyle(theme)}>
                <div style={getIconBoxStyle(theme)}><Icon size={19} color={theme === 'dark' ? "white" : "var(--accent-primary)"} strokeWidth={1.6} /></div>
                <div>
                  <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:'0.81rem',fontWeight:600,color:'var(--text-heading)',lineHeight:1.25 }}>{title}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace",fontSize:'0.61rem',color:'var(--text-muted)',marginTop:2 }}>{sub}</div>
                </div>
              </div>
            </foreignObject>
          ))}

          {/* Engine node */}
          <foreignObject x={EX} y={ECY-ENGINE_H/2} width={ENGINE_W} height={ENGINE_H}>
            <div style={{ width:'100%',height:'100%',background:'var(--bg-card)',
              border:`1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.1)'}`,borderRadius:20,
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
              gap:8,boxSizing:'border-box', boxShadow: theme === 'dark' ? 'none' : '0 4px 15px rgba(0,0,0,0.05)' }}>
              <Brain size={34} color={theme === 'dark' ? "white" : "var(--accent-primary)"} strokeWidth={1.4} />
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:'0.88rem',
                fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-heading)' }}>
                Scope AI Hub
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:'0.59rem',
                letterSpacing:'0.1em',color:'var(--text-muted)' }}>
                Learning Engine
              </div>
            </div>
          </foreignObject>

          {/* Output nodes */}
          {OUTPUTS.map(({ title, sub, Icon }, i) => (
            <foreignObject key={i} x={OX} y={OUTY[i]-OUTPUT_H/2} width={OUTPUT_W} height={OUTPUT_H}>
              <div style={getInputNodeStyle(theme)}>
                <div style={getIconBoxStyle(theme)}><Icon size={19} color={theme === 'dark' ? "white" : "var(--accent-primary)"} strokeWidth={1.6} /></div>
                <div>
                  <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:'0.81rem',fontWeight:600,color:'var(--text-heading)',lineHeight:1.25 }}>{title}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace",fontSize:'0.61rem',color:'var(--text-muted)',marginTop:2 }}>{sub}</div>
                </div>
              </div>
            </foreignObject>
          ))}
        </svg>
      </div>

      {/* ══════════════════════════ MOBILE ══════════════════════════════ */}
      <div className="ncg-mobile" style={{ maxWidth:420,margin:'0 auto',gap:1,
        background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',border:`1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}`,
        borderRadius:12,overflow:'hidden' }}>
        {INPUTS.map(({ title, sub, Icon }, i) => (
          <div key={i} style={{ background:'var(--bg-card)',padding:'13px 16px',
            display:'flex',alignItems:'center',gap:12, borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
            opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(10px)',
            transition:`opacity 0.4s ease ${0.1+i*0.07}s,transform 0.4s ease ${0.1+i*0.07}s` }}>
            <div style={getIconBoxStyle(theme)}><Icon size={18} color={theme === 'dark' ? "white" : "var(--accent-primary)"} strokeWidth={1.6} /></div>
            <div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:'0.8rem',fontWeight:600,color:'var(--text-heading)' }}>{title}</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:'0.6rem',color:'var(--text-muted)',marginTop:2 }}>{sub}</div>
            </div>
          </div>
        ))}
        <div style={{ background: theme === 'dark' ? '#0d0d0d' : 'var(--bg-secondary)',padding:'5px',textAlign:'center',
          fontFamily:"'DM Mono',monospace",fontSize:'0.55rem',
          color: theme === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)',letterSpacing:'0.2em' }}>▼ ▼ ▼</div>
        <div style={{ background:'var(--bg-card)',padding:'20px 16px',display:'flex',
          flexDirection:'column',alignItems:'center',textAlign:'center',gap:7,
          opacity:visible?1:0,transition:'opacity 0.5s ease 0.35s' }}>
          <Brain size={30} color={theme === 'dark' ? "white" : "var(--accent-primary)"} strokeWidth={1.4} />
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:'0.9rem',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-heading)' }}>Scope AI Hub</div>
          <div style={{ fontFamily:"'DM Mono',monospace",fontSize:'0.6rem',letterSpacing:'0.1em',color:'var(--text-muted)' }}>Learning Engine</div>
        </div>
        <div style={{ background: theme === 'dark' ? '#0d0d0d' : 'var(--bg-secondary)',padding:'5px',textAlign:'center',
          fontFamily:"'DM Mono',monospace",fontSize:'0.55rem',
          color: theme === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)',letterSpacing:'0.2em' }}>▼ ▼</div>
        {OUTPUTS.map(({ title, sub, Icon }, i) => (
          <div key={i} style={{ background:'var(--bg-card)',padding:'13px 16px',
            display:'flex',alignItems:'center',gap:12, borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
            opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(10px)',
            transition:`opacity 0.4s ease ${0.5+i*0.08}s,transform 0.4s ease ${0.5+i*0.08}s` }}>
            <div style={getIconBoxStyle(theme)}><Icon size={18} color={theme === 'dark' ? "white" : "var(--accent-primary)"} strokeWidth={1.6} /></div>
            <div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:'0.8rem',fontWeight:600,color:'var(--text-heading)' }}>{title}</div>
              <div style={{ fontFamily:"'DM Mono',monospace",fontSize:'0.6rem',color:'var(--text-muted)',marginTop:2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════ STATS GRID ══════════════════════════ */}
      <div className="ncg-grid" style={{
        display:'grid', maxWidth:1100, margin:'3.5rem auto 0',
        background: 'var(--bg-card)',
        border:`1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: theme === 'dark' ? 'none' : '0 4px 15px rgba(0,0,0,0.03)',
        borderRadius:12, overflow:'hidden',
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            borderRight: (i%4 !== 3) ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}` : 'none',
            borderBottom: i < 4 ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}` : 'none',
          }}>
            <StatCell label={s.label} value={s.value} suffix={s.suffix}
              active={visible} delay={0.5 + i * 0.06} theme={theme} />
          </div>
        ))}
      </div>

    </section>
  );
}