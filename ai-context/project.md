# Project

## Identity
- Name: SCOPE AI HUB
- Domain: https://scopeaihub.com
- Product type: Marketing + admissions + lead capture SPA for an AI training institute
- Hosting model: Vercel static frontend with Node.js serverless APIs under `/api/*`

## Product Purpose
- Convert visitors into qualified student enquiries and trainer applications
- Present AI course catalog with tiered learning paths and detailed course pages
- Communicate trust signals, career outcomes, and placement support

## Target Users
- Prospective students (freshers, career switchers, working professionals)
- Corporate or business learners exploring AI upskilling
- Industry professionals applying as trainers

## Core User Journeys
- Home → Courses list → Course detail → Enroll CTA → Contact modal form submit
- Home/About/Admissions/Career Support → Counseling CTA → Contact modal submit
- Careers/Join as Trainer → Trainer application modal submit
- Contact page direct form submission with optional preselected course query param

## Business Conversion Surfaces
- Global `ContactModal` with student and trainer modes
- Dedicated Contact page form
- Course detail enrollment CTA
- Floating WhatsApp + Tawk chat for assisted conversion

## Current Scope Boundaries
- Public marketing and information architecture only
- No user auth, student dashboard, payment checkout, or CMS runtime backend
- Content is code-driven from `src/data/*` and page/component source
