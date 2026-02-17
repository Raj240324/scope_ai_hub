import React, { useState, useEffect } from 'react';
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
  videoSrc,
  posterSrc,
  className = ""
}) => {
  const isHome = variant === 'home';
  const isVideo = variant === 'video';
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Determine if we should show video (desktop only for performance)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isVideo) {
    return (
      <section 
        className={`relative overflow-hidden min-h-[100vh] flex items-center justify-center ${className}`}
        aria-label="Homepage hero"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Poster / fallback image — always rendered underneath */}
          {posterSrc && (
            <img 
              src={posterSrc} 
              alt="" 
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          )}

          {/* Video — render on all devices */}
          {videoSrc && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 saturate-[1.2] contrast-[1.1] brightness-[1.1] ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          {/* World Class Overlay - Sophisticated & Clean */}
          {/* 1. Base subtle dark overlay */}
          <div className="absolute inset-0 bg-navy/30 mix-blend-multiply z-[1]" />
          <div className="absolute inset-0 bg-black/30 z-[1]" />
          
          {/* 2. Brand Gradient Mesh - "Purple -> Magenta" & "Cyan -> Blue" fusion */}
          {/* Top-Right: Cyan/Blue Glow (Tech/Human Shape vibe) */}
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle,_var(--color-brand-cyan-primary)_0%,_transparent_70%)] opacity-20 z-[2] mix-blend-screen pointer-events-none" />
          
          {/* Bottom-Left: Purple/Magenta Glow (Base vibe) */}
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_var(--color-brand-purple-highlight)_0%,_transparent_70%)] opacity-20 z-[2] mix-blend-screen pointer-events-none" />
          
          {/* 3. Bottom cinematic fade */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-[3]" />
        </div>

        {/* Content Overlay — Elegant, High-End SaaS Style */}
        <div className="container-custom relative z-10 pt-24 px-6 md:px-0">
          <div className="max-w-4xl mx-auto text-center">
            <StaggerContainer>
              <StaggerItem>
                {badge && (
                  <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-white/5 text-white/90 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-black/10">
                    {badge}
                  </div>
                )}
              </StaggerItem>
              
              <StaggerItem>
                {/* Elegant Typography - Bold but not Heavy */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
                  {title}
                </h1>
              </StaggerItem>
              
              <StaggerItem>
                {subtitle && (
                  <p className="text-lg md:text-xl mb-12 leading-relaxed text-white/80 max-w-2xl mx-auto font-medium drop-shadow-md">
                    {subtitle}
                  </p>
                )}
              </StaggerItem>

              <StaggerItem>
                {children && <div>{children}</div>}
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

      </section>
    );
  }

  // Original hero variants (home & simple)
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
