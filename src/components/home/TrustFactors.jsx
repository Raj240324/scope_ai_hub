import React from 'react';
import { Cpu, Award, Rocket } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const TrustFactors = () => (
  <section className="section-padding bg-[var(--bg-body)] relative overflow-hidden border-b border-[var(--border-color)]">
    {/* Soft radial glow background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl blur-layer" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl blur-layer" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl blur-layer" />
    </div>

    <div className="container-custom relative z-10">
      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="text-caption font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-2">Trusted Education Partner</p>
        <h2 className="heading-lg font-bold text-[var(--text-heading)] leading-tight mb-4">
          Why Choose <span className="font-extrabold text-primary">{BRANDING.fullName}?</span>
        </h2>
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-small sm:text-base font-bold text-white shadow-lg"
          style={{ background: 'linear-gradient(90deg, #B8860B 0%, #DAA520 40%, #FFD700 60%, #DAA520 80%, #B8860B 100%)' }}>
          <Rocket className="h-4 w-4 shrink-0" />
          Your Career Launchpad in AI &amp; Cloud
          <Rocket className="h-4 w-4 shrink-0 scale-x-[-1]" />
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="block md:hidden">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl blur-layer scale-110" />
            <div className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center text-center shadow-2xl"
              style={{ background: 'conic-gradient(from 180deg at 50% 50%, #1e3a8a 0deg, #1d4ed8 90deg, #0284c7 180deg, #1d4ed8 270deg, #1e3a8a 360deg)', border: '4px solid #FFD700' }}>
              <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-1">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <p className="text-caption font-black text-white/80 uppercase tracking-widest leading-none">Ai</p>
                <p className="text-small font-black text-white leading-none mt-0.5 whitespace-nowrap">SCOPE AI HUB</p>
                <div className="mt-1 flex gap-0.5">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/40" />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {[
            { num: "1", title: "Industry-Focused Curriculum", sub: "Real Corporate Needs", accent: "#1d4ed8" },
            { num: "2", title: "75% Practical Learning", sub: "Labs + Projects + Case Studies", accent: "#047857" },
            { num: "3", title: "Industry Mentors", sub: "8+ Years Experience", accent: "#7e22ce" },
            { num: "4", title: "Real-World Projects", sub: "157+ Projects Completed", accent: "#c2410c" },
            { num: "5", title: "Career Preparation", sub: "Resume + Interviews + Guidance", accent: "#b45309", isPrep: true },
            { num: "6", title: "Hiring Network", sub: "75+ Partners · Tier 1 & Tier 2 Companies", accent: "#0f766e" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5 shadow-sm hover:shadow-md transition-all"
              style={{ background: item.isPrep ? 'rgba(245,158,11,0.12)' : 'var(--bg-card)', borderLeft: `4px solid ${item.accent}`, border: item.isPrep ? '2px solid #fbbf24' : '1px solid var(--border-color)', borderLeftWidth: '4px', borderLeftColor: item.accent }}>
              <span className="w-6 h-6 rounded-full text-white text-caption font-black flex items-center justify-center shrink-0" style={{ background: item.accent }}>{item.num}</span>
              <div className="flex-1">
                <p className="font-bold text-small leading-snug text-[var(--text-heading)]">{item.title}</p>
                <p className="text-caption text-[var(--text-muted)] mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 rounded-xl px-3 py-3 shadow-md" style={{ background: '#1e293b', border: '2px solid #fbbf24' }}>
            <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-caption font-black flex items-center justify-center shrink-0">7</span>
            <div className="flex-1">
              <p className="font-bold text-small text-white leading-snug">Career Launch</p>
              <p className="text-caption text-white/60 mt-0.5">Job-Ready AI Professionals</p>
            </div>
            <span className="text-body-lg shrink-0">🚀</span>
          </div>
        </div>
      </div>

      {/* TABLET LAYOUT */}
      <div className="hidden md:flex xl:hidden flex-col items-center gap-6">
        <div className="flex items-center gap-6 w-full">
          <div className="flex flex-col gap-3 flex-1">
            {[
              { num: "1", title: "Industry-Focused Curriculum", sub: "Real Corporate Needs", emoji: "💼", accent: "#1d4ed8" },
              { num: "2", title: "75% Practical Learning", sub: "Labs + Projects + Case Studies", emoji: "🔬", accent: "#047857" },
              { num: "3", title: "Industry Mentors", sub: "8+ Years Experience", emoji: "🎓", accent: "#7e22ce" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-md transition-all p-0 overflow-hidden"
                style={{ borderRightWidth: '4px', borderRightColor: item.accent }}>
                <span className="w-7 text-center text-white text-caption font-black py-4 shrink-0 self-stretch flex items-center justify-center" style={{ background: item.accent }}>{item.num}</span>
                <div className="flex-1 py-2.5 pr-2">
                  <p className="font-bold text-small text-[var(--text-heading)] leading-snug">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-caption mt-0.5">({item.sub})</p>
                </div>
                <span className="text-body-lg pr-3 shrink-0">{item.emoji}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl blur-layer scale-110" />
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="relative w-44 h-44 rounded-full flex flex-col items-center justify-center text-center shadow-2xl"
                style={{ background: 'conic-gradient(from 180deg at 50% 50%, #1e3a8a 0deg, #1d4ed8 90deg, #0284c7 180deg, #1d4ed8 270deg, #1e3a8a 360deg)', border: '4px solid #FFD700' }}>
                <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-1">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-caption font-black text-white/80 uppercase tracking-widest leading-none">Ai</p>
                  <p className="text-small font-black text-white leading-none mt-0.5 whitespace-nowrap">SCOPE AI HUB</p>
                  <div className="mt-1.5 flex gap-0.5">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/40" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {[
              { num: "4", title: "Real-World Projects", sub: "157+ Projects Completed", emoji: "🖥️", accent: "#c2410c" },
              { num: "5", title: "Career Preparation", sub: "Resume + Interviews + Guidance", emoji: "✍️", accent: "#b45309" },
              { num: "6", title: "Hiring Network", sub: "75+ Partners · Tier 1 & Tier 2", emoji: "🤝", accent: "#0f766e" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                style={{ borderRightWidth: '4px', borderRightColor: item.accent }}>
                <span className="w-7 text-center text-white text-caption font-black py-4 shrink-0 self-stretch flex items-center justify-center" style={{ background: item.accent }}>{item.num}</span>
                <div className="flex-1 py-2.5 pr-2">
                  <p className="font-bold text-small text-[var(--text-heading)] leading-snug">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-caption mt-0.5">({item.sub})</p>
                </div>
                <span className="text-body-lg pr-3 shrink-0">{item.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md border-2 border-amber-400/50 rounded-xl shadow-md p-4 text-center" style={{ background: 'var(--bg-inverted)' }}>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-caption font-black flex items-center justify-center shrink-0">7</span>
            <p className="font-bold text-small text-[var(--text-on-inverted)]">Career Launch</p>
            <span className="text-body-lg">🚀</span>
          </div>
          <p className="text-[var(--text-on-inverted)]/60 text-caption">Job-Ready AI Professionals</p>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden xl:flex flex-row items-center justify-center">
        <div className="flex flex-col gap-3.5 w-[320px] shrink-0">
          {[
            { num: "1", title: "Industry-Focused Curriculum", sub: "Real Corporate Needs", emoji: "💼", borderColor: "#3b82f6", badgeBg: "#1d4ed8" },
            { num: "2", title: "75% Practical Learning", sub: "Labs + Projects + Case Studies", emoji: "🔬", borderColor: "#10b981", badgeBg: "#047857" },
            { num: "3", title: "Industry Mentors", sub: "8+ Years Experience", emoji: "🎓", borderColor: "#a855f7", badgeBg: "#7e22ce" },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                style={{ borderRightWidth: '4px', borderRightColor: item.borderColor }}>
                <span className="text-caption font-black text-white px-2 py-4 flex items-center justify-center shrink-0 self-stretch" style={{ background: item.badgeBg, borderRadius: '10px 0 0 10px' }}>{item.num}</span>
                <div className="flex-1 py-3">
                  <p className="font-bold text-small text-[var(--text-heading)] leading-snug">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-caption mt-0.5">({item.sub})</p>
                </div>
                <span className="heading-sm pr-3 shrink-0">{item.emoji}</span>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-[76px] z-20">
                <svg width="76" height="44" viewBox="0 0 80 44" fill="none">
                  <path d="M2 38 Q20 38 36 22 Q52 6 72 6" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  <polygon points="72,1 80,6 72,11" fill="var(--color-primary)" opacity="0.6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-between px-8 min-h-[480px]">
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl blur-layer scale-110" />
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="relative w-52 h-52 rounded-full flex flex-col items-center justify-center text-center shadow-2xl"
                style={{ background: 'conic-gradient(from 180deg at 50% 50%, #1e3a8a 0deg, #1d4ed8 90deg, #0284c7 180deg, #1d4ed8 270deg, #1e3a8a 360deg)', border: '4px solid #FFD700' }}>
                <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-caption font-black text-white/80 uppercase tracking-widest leading-none">Ai</p>
                  <p className="text-body-lg font-black text-white leading-none mt-0.5 whitespace-nowrap">SCOPE AI HUB</p>
                  <div className="mt-1.5 flex gap-0.5">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/40" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-[320px] mt-7">
            <div className="absolute -top-[76px] left-1/2 -translate-x-1/2 z-20">
              <svg width="44" height="76" viewBox="0 0 44 80" fill="none">
                <path d="M38 78 Q38 56 22 42 Q8 28 8 8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.85"/>
                <polygon points="3,8 8,0 13,8" fill="#F59E0B" fillOpacity="0.9"/>
              </svg>
            </div>
            <div className="border-2 border-amber-400/50 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden" style={{ background: 'var(--bg-inverted)' }}>
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div className="flex-1 text-center">
                  <p className="font-black text-body text-[var(--text-on-inverted)] leading-snug">7. Career Launch</p>
                  <p className="text-[var(--text-on-inverted)]/60 text-caption mt-0.5">Job-Ready AI Professionals</p>
                </div>
                <span className="heading-md shrink-0">🚀</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 w-[320px] shrink-0">
          {[
            { num: "4", title: "Real-World Projects", sub: "157+ Projects Completed", emoji: "🖥️", borderColor: "#f97316", badgeBg: "#c2410c" },
            { num: "5", title: "Career Preparation", sub: "Resume + Interviews + Guidance", emoji: "✍️", borderColor: "#f59e0b", badgeBg: "#b45309" },
            { num: "6", title: "Hiring Network", sub: "75+ Partners · Tier 1 & Tier 2", emoji: "🤝", borderColor: "#14b8a6", badgeBg: "#0f766e" },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 -left-[76px] z-20">
                <svg width="76" height="44" viewBox="0 0 80 44" fill="none">
                  <path d="M78 38 Q60 38 44 22 Q28 6 8 6" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  <polygon points="8,1 0,6 8,11" fill="var(--color-primary)" opacity="0.6" />
                </svg>
              </div>
              <div className="flex items-center gap-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                style={{ borderRightWidth: '4px', borderRightColor: item.borderColor }}>
                <span className="text-caption font-black text-white px-2 py-4 flex items-center justify-center shrink-0 self-stretch" style={{ background: item.badgeBg, borderRadius: '10px 0 0 10px' }}>{item.num}</span>
                <div className="flex-1 py-3">
                  <p className="font-bold text-small text-[var(--text-heading)] leading-snug">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-caption mt-0.5">({item.sub})</p>
                </div>
                <span className="heading-sm pr-3 shrink-0">{item.emoji}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="mt-12 dark-section rounded-2xl shadow-xl">
        <div className="flex flex-wrap sm:hidden">
          {[
            { value: "75%", label: "Practical", highlight: true },
            { value: "157+", label: "Projects", highlight: false },
            { value: "8+ Yrs", label: "Mentors' Exp", highlight: false },
            { value: "75+", label: "Hiring Partners", highlight: false },
            { value: "100%", label: "Placement Support", highlight: true },
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-5 px-4 text-center gap-1 hover:bg-[var(--glass-bg)] transition-colors ${i < 4 ? 'w-1/2' : 'w-full border-t border-[var(--glass-border)]'} ${i === 0 || i === 2 ? 'border-r border-[var(--glass-border)]' : ''} ${i < 2 ? 'border-b border-[var(--glass-border)]' : ''}`}>
              <span className={`heading-md font-bold ${stat.highlight ? 'text-amber-400' : 'text-white'}`}>{stat.value}</span>
              <span className="text-caption font-bold uppercase tracking-wider text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="hidden sm:grid sm:grid-cols-5 divide-x divide-[var(--glass-border)]">
          {[
            { value: "75%", label: "Practical", highlight: true },
            { value: "157+", label: "Projects", highlight: false },
            { value: "8+ Yrs", label: "Mentors' Exp", highlight: false },
            { value: "75+", label: "Hiring Partners", highlight: false },
            { value: "100%", label: "Placement Support", highlight: true },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center gap-1 hover:bg-[var(--glass-bg)] transition-colors">
              <span className={`heading-md font-bold ${stat.highlight ? 'text-amber-400' : 'text-white'}`}>{stat.value}</span>
              <span className="text-caption font-bold uppercase tracking-wider text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustFactors;
