import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import BatchCountdown from '../components/ui/BatchCountdown';
import { batches } from '../data/batches';
import { CalendarCheck, Clock, Users, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from '../components/utils/Animations';

const UpcomingBatches = () => {
  const { openModal } = useModal();
  
  // Sort batches by date
  const sortedBatches = [...batches].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const nextBatch = sortedBatches[0];

  return (
    <Layout
      title="Upcoming Batches | Raj Software Training Institute"
      description="Check our upcoming batch schedules with start dates, timings, and seat availability. Limited seats available - enroll now!"
    >
      <Hero
        badge={
          <div className="flex items-center space-x-2">
            <CalendarCheck className="h-3 w-3" />
            <span>New Batches Starting Soon</span>
          </div>
        }
        title={<>Secure Your Seat in Our <span className="text-primary">Next Batch</span></>}
        subtitle="Limited seats available for each batch. Check the countdown timer and enroll before the batch fills up!"
      />

      {/* Stats */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: sortedBatches.length, label: 'Batches Starting', icon: <CalendarCheck className="h-5 w-5" /> },
              { value: '24/7', label: 'Support Available', icon: <Clock className="h-5 w-5" /> },
              { value: '30', label: 'Max Batch Size', icon: <Users className="h-5 w-5" /> },
              { value: '100%', label: 'Placement Assist', icon: <Zap className="h-5 w-5" /> }
            ].map((stat, index) => (
              <StaggerItem key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Next Batch */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              Starting Soonest
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Next Batch <span className="text-primary">Countdown</span>
            </h2>
            <p className="text-slate-600">
              Don't miss out! Our next batch is filling up fast. Secure your seat now.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <BatchCountdown batch={nextBatch} />
          </div>
        </div>
      </section>

      {/* All Upcoming Batches */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                All Upcoming Batches
              </h2>
              <p className="text-slate-600">Choose a batch that fits your schedule</p>
            </div>
            <Link 
              to="/courses" 
              className="hidden md:flex items-center text-primary font-bold hover:underline"
            >
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBatches.map((batch) => (
              <StaggerItem key={batch.id}>
                <BatchCountdown batch={batch} variant="compact" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-8 border-white" />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-8 border-white" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Can't Find a Suitable Batch?
              </h2>
              <p className="text-lg text-white/80 mb-10">
                Request a custom batch timing or get notified when new batches are scheduled.
              </p>
              <button 
                onClick={() => openModal('Custom Batch Request')}
                className="bg-white text-primary font-bold px-10 py-4 rounded-2xl hover:bg-slate-100 transition-all shadow-xl"
              >
                Request Custom Timing
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UpcomingBatches;
