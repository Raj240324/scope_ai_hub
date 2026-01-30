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
    <section className={`relative overflow-hidden ${isHome ? 'bg-white pt-12 pb-16 md:pt-20 md:pb-24' : 'bg-white py-12 md:py-20 border-b border-slate-100'} ${className}`}>
      {/* Background Elements - Subtle and Clean */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className={isHome ? "grid lg:grid-cols-2 gap-12 items-center" : "max-w-4xl"}>
          <StaggerContainer>
            <StaggerItem>
              {badge && (
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                  {badge}
                </div>
              )}
            </StaggerItem>
            
            <StaggerItem>
              <h1 className={`${isHome ? 'text-3xl md:text-4xl lg:text-4xl font-black' : 'text-2xl md:text-3xl lg:text-4xl font-extrabold'} tracking-tight text-slate-900 mb-6 leading-[1.1]`}>
                {title}
              </h1>
            </StaggerItem>
            
            <StaggerItem>
              {subtitle && (
                <p className={`text-base md:text-lg text-slate-600 mb-8 leading-relaxed ${isHome ? 'max-w-xl' : 'max-w-3xl'}`}>
                  {subtitle}
                </p>
              )}
            </StaggerItem>

            <StaggerItem>
              {children && <div className="mt-8">{children}</div>}
            </StaggerItem>
          </StaggerContainer>

          {isHome && (rightContent || image) && (
            <div className="relative hidden lg:block">
              {rightContent || (
                <FadeIn direction="left" delay={0.2}>
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src={image} 
                      alt="Hero Image" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
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
