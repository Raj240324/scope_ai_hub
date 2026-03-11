import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import DominoScroll from '../ui/DominoScroll';
import { batches } from '../../data/batches';

const BatchScheduleSection = ({ showHybridCallout = true }) => {
  const { openModal } = useModal();

  return (
    <div className="container-custom">
      {/* Section heading — sits ABOVE the domino scroll zone */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-caption font-bold tracking-wider">
          Flexible Scheduling
        </div>
        <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-4">
          Batch Schedules Built for Professionals
        </h2>
        <p className="text-[var(--text-muted)] text-body-lg">
          Our trainers are working IT professionals — so we schedule around real lives, not the other way around.
        </p>
      </div>

      {/* Hybrid training callout */}
      {showHybridCallout && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] mb-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl blur-layer" />
          <h3 className="heading-md font-bold text-[var(--text-heading)] mb-4 relative z-10">
            India's First Hybrid AI Training — Online Meets In-Person
          </h3>
          <p className="text-[var(--text-muted)] max-w-2xl mb-6 relative z-10">
            Train online on weekdays from home. Walk into our center on alternate weekends
            for hands-on sessions with your trainer. No other institute in India offers this model.
          </p>
          <div className="flex items-center gap-6 text-small font-medium relative z-10">
            <span>📻 Weekdays Online</span>
            <span className="text-primary animate-pulse">⇄</span>
            <span>🏢 Alternate Weekends In-Person</span>
          </div>
        </motion.div>
      )}

      {/* Scroll hint */}
      <div className="text-center mb-2">
        <p className="text-[var(--text-muted)] text-caption font-semibold tracking-widest uppercase">
          Scroll to explore batches ↓
        </p>
      </div>

      {/* DOMINO SCROLL */}
      <DominoScroll
        scrollDistance={1800}
        containerClassName="h-[750px] sm:h-[650px] md:h-[550px] lg:h-[520px]"
        wrapperMaxWidth="900px"
      >
        {batches.map((batch, i) => (
          <div key={i} className="w-full h-full flex items-center justify-center px-4 md:px-0">
            <div
              className="relative w-full rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 md:p-10 overflow-hidden shadow-2xl"
              style={{ boxShadow: `0 8px 60px 0 ${batch.glow}, 0 1px 0 0 rgba(255,255,255,0.04) inset` }}
            >
              {/* Gradient accent wash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${batch.accent} opacity-50 pointer-events-none`} />

              {/* Progress dots */}
              <div className="absolute top-6 right-8 flex items-center gap-1.5 z-10">
                {batches.map((_, dot) => (
                  <span
                    key={dot}
                    className={`block rounded-full transition-all ${
                      dot === i
                        ? 'w-5 h-2 bg-primary'
                        : 'w-2 h-2 bg-[var(--border-color)]'
                    }`}
                  />
                ))}
              </div>

              {/* Status badge */}
              <span className={`inline-flex items-center px-3 py-1 mb-6 text-caption font-bold rounded-full relative z-10 ${batch.statusColor}`}>
                🔥 {batch.status}
              </span>

              {/* Main layout */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:gap-14">
                {/* Left — identity */}
                <div className="flex-1 mb-8 md:mb-0">
                  <div className="text-5xl mb-4">{batch.emoji}</div>
                  <h3 className="heading-md font-bold text-[var(--text-heading)] mb-1">
                    {batch.title}
                  </h3>
                  <p className="text-body text-[var(--text-muted)] font-medium mb-3">
                    {batch.days}
                  </p>
                  <p className="text-caption text-[var(--text-muted)]">{batch.desc}</p>
                </div>

                {/* Right — detail tiles */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                    <p className="text-caption text-[var(--text-muted)] mb-1 uppercase tracking-wider font-semibold">Time</p>
                    <p className="font-bold text-[var(--text-heading)] leading-tight">{batch.time}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                    <p className="text-caption text-[var(--text-muted)] mb-1 uppercase tracking-wider font-semibold">Mode</p>
                    <p className="font-bold text-[var(--text-heading)] leading-tight">{batch.mode}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                    <p className="text-caption text-primary mb-1 uppercase tracking-wider font-semibold">Availability</p>
                    <p className="font-bold text-primary leading-tight">{batch.status}</p>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="relative z-10 mt-8 pt-8 border-t border-[var(--border-color)] flex items-center justify-between gap-4 flex-wrap">
                <p className="text-caption text-[var(--text-muted)]">
                  Batch {i + 1} of {batches.length} — keep scrolling ↓
                </p>
                <button
                  onClick={() => openModal()}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 btn-primary text-small font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
                >
                  Reserve Seat
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </DominoScroll>

      {/* CTA below the domino sequence */}
      <div className="text-center -mt-6">
        <button
          onClick={() => openModal()}
          className="group inline-flex items-center gap-2 px-8 py-4 btn-primary text-body-lg text-[var(--text-on-inverted)] font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)]"
        >
          Book Your Free Counseling Session
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default BatchScheduleSection;
