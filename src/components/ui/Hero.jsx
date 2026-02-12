import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer, StaggerItem } from '../utils/Animations';

const Hero = ({ 
  title, 
  subtitle, 
  badge, 
  children, 
  variant = 'simple',
  image,
  rightContent,
  className = ""
}) => {
  const isHome = variant === 'home';

  return (
    <section 
      className={`relative overflow-hidden ${isHome ? 'bg-[var(--bg-body)] pt-28 pb-12 md:pt-40 md:pb-24 border-b border-[var(--border-color)]' : 'bg-[var(--bg-body)] pt-32 pb-12 md:pt-40 md:pb-20 border-b border-[var(--border-color)]'} ${className}`}
      aria-label={isHome ? 'Homepage hero' : undefined}
    >
      {/* Background Elements - Premium Mesh Effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ${isHome ? 'bg-primary/20' : 'bg-primary/5'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] ${isHome ? 'bg-primary/15' : 'bg-secondary/5'}`} />
        {isHome && <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] bg-primary/5 rounded-full blur-[80px]" />}
      </div>

      <div className="container-custom relative z-10">
        <div className={isHome ? "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" : "max-w-4xl"}>
          {/* Left Content */}
          <StaggerContainer>
            <StaggerItem>
              {badge && (
                <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${isHome ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-primary/10 text-primary'}`}>
                  {badge}
                </div>
              )}
            </StaggerItem>
            
            <StaggerItem>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tight mb-6 leading-[1.1]">
                {title}
              </h1>
            </StaggerItem>
            
            <StaggerItem>
              {subtitle && (
                <p className={`text-base md:text-lg mb-8 leading-relaxed text-[var(--text-muted)] ${isHome ? 'max-w-xl' : 'max-w-3xl'}`}>
                  {subtitle}
                </p>
              )}
            </StaggerItem>

            <StaggerItem>
              {children && <div>{children}</div>}
            </StaggerItem>
          </StaggerContainer>

          {/* Right Content — contained with padding for floating cards */}
          {isHome && (rightContent || image) && (
            <div className="relative hidden md:block p-8">
              {rightContent || (
                <FadeIn direction="left" delay={0.2}>
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                    <img 
                      src={image} 
                      alt="Hero Image" 
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  </div>
                </FadeIn>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

