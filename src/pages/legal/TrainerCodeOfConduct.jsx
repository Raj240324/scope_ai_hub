import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/ui/Hero';
import { BookOpen, ShieldCheck, Star, Heart, Scale } from 'lucide-react';
import { BRANDING } from '../../data/branding';

const TrainerCodeOfConduct = () => {
  return (
    <Layout>
      <Hero 
        title={<>Trainer <span className="text-primary">Code of Conduct</span></>}
        subtitle={`Professional Standards & Pedagogical Ethics | Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Star className="h-6 w-6 text-primary mr-3" />
              1. Pedagogical Excellence
            </h2>
            <p className="text-slate-600 mb-4">
              Trainers at {BRANDING.fullName} are committed to delivering the highest quality of technical education. This includes staying updated with 2026 industry standards and ensuring that all project-based learning is relevant to current market demands.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <ShieldCheck className="h-6 w-6 text-primary mr-3" />
              2. Data Ethics & Confidentiality
            </h2>
            <p className="text-slate-600 mb-4">
              In accordance with our NDA Policy, trainers must protect all student data and intellectual property. Unauthorized sharing of student projects, resumes, or performance metrics is strictly prohibited.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Heart className="h-6 w-6 text-primary mr-3" />
              3. Inclusive Learning Environment
            </h2>
            <p className="text-slate-600 mb-4">
              {BRANDING.fullName} maintains a Zero-Tolerance policy towards discrimination. Trainers must foster a supportive, inclusive, and respectful environment for all students, regardless of their background or current technical proficiency.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Scale className="h-6 w-6 text-primary mr-3" />
              4. Professional Integrity
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Trainers must provide honest, constructive feedback that helps students grow.</li>
              <li>Plagiarism or the use of unlicensed materials in teaching is strictly forbidden.</li>
              <li>Trainers must clearly distinguish between institute-provided curriculum and their personal opinions or external consulting work.</li>
            </ul>
          </section>

          <section className="p-8 bg-slate-50 border border-slate-100 rounded-3xl">
            <p className="font-black text-lg text-slate-900 mb-2">{BRANDING.fullName}</p>
            <p className="text-slate-600">Educational Quality Assurance Team</p>
            <div className="flex flex-col space-y-2 text-sm font-medium mt-4">
              <p className="text-slate-700">Inquiries: <span className="text-primary">{BRANDING.email}</span></p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerCodeOfConduct;
