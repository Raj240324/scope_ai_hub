import React, { useState, useEffect } from 'react';
import { Clock, Users, CalendarDays, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const BatchCountdown = ({ batch, variant = 'default' }) => {
  const { openModal } = useModal();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(batch.startDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [batch.startDate]);

  const seatPercentage = ((batch.totalSeats - batch.seatsLeft) / batch.totalSeats) * 100;
  const isAlmostFull = batch.seatsLeft <= 5;

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all group h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
              {batch.courseName}
            </h4>
            <p className="text-xs text-slate-500 mt-1">{batch.mode}</p>
          </div>
          {isAlmostFull && (
            <span className="text-[10px] font-black text-white bg-red-500 px-2 py-1 rounded-full uppercase animate-pulse">
              Filling Fast
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {new Date(batch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {batch.seatsLeft} seats left
          </div>
        </div>

        {/* Mini Countdown */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-slate-50 rounded-lg py-2 text-center">
            <span className="text-lg font-black text-primary">{timeLeft.days}</span>
            <span className="text-[10px] text-slate-400 ml-1">d</span>
          </div>
          <div className="flex-1 bg-slate-50 rounded-lg py-2 text-center">
            <span className="text-lg font-black text-slate-900">{timeLeft.hours}</span>
            <span className="text-[10px] text-slate-400 ml-1">h</span>
          </div>
          <div className="flex-1 bg-slate-50 rounded-lg py-2 text-center">
            <span className="text-lg font-black text-slate-900">{timeLeft.minutes}</span>
            <span className="text-[10px] text-slate-400 ml-1">m</span>
          </div>
        </div>

        <button 
          onClick={() => openModal(batch.courseName)}
          className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all"
        >
          Enroll Now
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {isAlmostFull && (
              <span className="text-[10px] font-black text-white bg-red-500 px-2.5 py-1 rounded-full uppercase animate-pulse">
                Filling Fast
              </span>
            )}
            <span className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">
              {batch.mode}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors mb-1">
            {batch.courseName}
          </h3>
          <p className="text-sm text-slate-500">Instructor: {batch.instructor}</p>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Mins' },
          { value: timeLeft.seconds, label: 'Secs' },
        ].map((unit, i) => (
          <div key={i} className="bg-slate-900 rounded-2xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-black text-white mb-1">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <CalendarDays className="h-4 w-4" />
            Start Date
          </div>
          <p className="font-bold text-slate-900">
            {new Date(batch.startDate).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <Clock className="h-4 w-4" />
            Duration
          </div>
          <p className="font-bold text-slate-900">{batch.duration}</p>
        </div>
      </div>

      {/* Seats Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-slate-600">Seats Filling</span>
          <span className="font-bold text-slate-900">{batch.seatsLeft} / {batch.totalSeats} left</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${seatPercentage}%` }}
          />
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 mb-6">
        {batch.highlights.map((highlight, i) => (
          <span key={i} className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            {highlight}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button 
          onClick={() => openModal(batch.courseName)}
          className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
          Enroll Now
        </button>
        <Link 
          to={`/courses/${batch.courseId}`}
          className="px-6 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:border-primary hover:text-primary transition-all flex items-center"
        >
          Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BatchCountdown;
