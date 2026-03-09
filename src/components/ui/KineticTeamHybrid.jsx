import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';

/* ---------- Data ---------- */

const TEAM = [
  {
    id: '01',
    name: 'Sanjula',
    role: 'Head of Academics',
    bio: '8+ years of AI & Data Science industry experience, leading curriculum design aligned with global tech standards.',
    expertise: ['Curriculum Design', 'AI & Data Science', 'Academic Leadership'],
    image: 'https://randomuser.me/api/portraits/women/75.jpg',
  },
  {
    id: '02',
    name: 'Raghavi',
    role: 'Head – Placements & Corporate Relations',
    bio: 'Former HR professional with experience in enterprise hiring, building strong industry partnerships for student career acceleration.',
    expertise: ['Placements', 'Corporate Relations', 'Enterprise HR'],
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '03',
    name: 'Suresh M',
    role: 'Principal AI Consultant & Lead Trainer',
    bio: 'Enterprise AI practitioner transforming complex technologies into practical, career-ready skillsets.',
    expertise: ['AI Consulting', 'Machine Learning', 'Applied Training'],
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];

/* ---------- Main Component ---------- */

export default function KineticTeamHybrid() {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full cursor-default px-6 py-16 md:py-24 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="heading-lg font-bold text-[var(--text-heading)]">
              Our <span className="font-extrabold text-primary">Mentors</span>
            </h2>
          </div>
          <div className="h-px flex-1 bg-[var(--border-color)] mx-8 hidden md:block" />
          <p className="text-caption font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Industry Veterans
          </p>
        </motion.header>

        {/* The List */}
        <div className="flex flex-col">
          {TEAM.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY: Global Floating Cursor Image */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative h-64 w-80 overflow-hidden rounded-xl border border-primary/20 bg-[var(--bg-card)] shadow-2xl"
              >
                <img
                  src={TEAM.find((t) => t.id === activeId)?.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />

                {/* Overlay Metadata */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-caption uppercase tracking-widest text-[var(--text-muted)]">
                      {TEAM.find((t) => t.id === activeId)?.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Row Component ---------- */

function TeamRow({ data, index, isActive, setActiveId, isMobile, isAnyActive }) {
  const isDimmed = isAnyActive && !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
      }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        backgroundColor: isActive && isMobile ? 'rgba(167, 63, 208, 0.05)' : 'transparent',
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={`group relative border-t border-[var(--border-color)] transition-colors duration-500 last:border-b ${
        isMobile ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className="relative z-10 flex flex-col py-6 md:flex-row md:items-center md:justify-between md:py-8">
        {/* Name & Index */}
        <div className="flex items-baseline gap-6 md:gap-12 pl-4 md:pl-0 transition-transform duration-500 group-hover:translate-x-4">
          <span className="font-mono text-caption text-[var(--text-muted)]">
            {data.id}
          </span>
          <h3 className="heading-sm font-semibold tracking-tight text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-heading)]">
            {data.name}
          </h3>
        </div>

        {/* Role & Icon */}
        <div className="mt-4 flex items-center justify-between pl-12 pr-4 md:mt-0 md:justify-end md:gap-12 md:pl-0 md:pr-0">
          <span className="text-caption sm:text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors group-hover:text-primary">
            {data.role}
          </span>

          {/* Mobile Toggle Icon */}
          <div className="block md:hidden text-[var(--text-muted)]">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          {/* Desktop Arrow */}
          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className="hidden md:block text-primary"
          >
            <ArrowUpRight size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* MOBILE ONLY: Inline Accordion */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 pb-8">
              <div className="flex gap-4 items-start">
                <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-small text-body mb-3">
                    {data.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider rounded-md border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
