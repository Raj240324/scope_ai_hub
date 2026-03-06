import React from 'react';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/utils/SEO';
import Hero from '../../components/ui/Hero';
import PlacementSection from '../../components/home/PlacementSection';
import CareerSupportSection from '../../components/home/CareerSupportSection';
import HiringPartners from '../../components/home/HiringPartners';
import CTASection from '../../components/home/CTASection';
import { useModal } from '../../context/ModalContext';
import { BRANDING } from '../../data/branding';

const CareerSupport = () => {
  const { openModal } = useModal();

  return (
    <Layout>
      <SEO
        title={`Career Support | Placement Assistance at ${BRANDING.fullName}`}
        description="Industry-focused placement support including resume building, mock interviews, mentorship, and job referrals. 90%+ placement rate with 75+ hiring partners."
        canonical="/career-support"
        type="website"
      />

      <Hero
        badge="90%+ Placement Rate · 75+ Hiring Partners"
        title={<>Your Career, Our <span className="text-primary">Mission</span>.</>}
        subtitle="From resume building to job referrals — we support you at every step until you land your dream role."
        actions={[
          { label: "Explore Courses", href: "/courses" },
          { label: "Enroll Now", onClick: openModal }
        ]}
      />

      <PlacementSection openModal={openModal} />
      <CareerSupportSection />
      <HiringPartners />
      <CTASection openModal={openModal} />
    </Layout>
  );
};

export default CareerSupport;
