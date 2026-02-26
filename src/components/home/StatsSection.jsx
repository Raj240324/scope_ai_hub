import React from 'react';
import { Code2, Award, Building2, Zap } from 'lucide-react';
import { StaggerContainer, StaggerItem, ScrollCountUp } from '../utils/Animations';

const stats = [
  { label: "Real-World Projects", value: "157+", icon: <Code2 className="h-5 w-5" /> },
  { label: "Trainer Experience (Yrs)", value: "5+", icon: <Award className="h-5 w-5" /> },
  { label: "Hiring Partners", value: "75+", icon: <Building2 className="h-5 w-5" /> },
  { label: "Practical Curriculum", value: "75%", icon: <Zap className="h-5 w-5" /> },
];

const StatsSection = () => (
  <section className="py-12 bg-[var(--bg-body)] border-b border-[var(--border-color)]">
    <div className="container-custom">
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {stats.map((stat, index) => (
          <StaggerItem key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/5 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
              {stat.icon}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 text-[var(--text-heading)]">
              {/^\d/.test(stat.value) ? <ScrollCountUp end={stat.value} /> : stat.value}
            </div>
            <div className="text-[10px] sm:text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider">{stat.label}</div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default StatsSection;
