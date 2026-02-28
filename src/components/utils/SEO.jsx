import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRANDING } from '../../data/branding';

/**
 * SEO Component — Manages meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
 * @param {object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.canonical - Canonical path (e.g. "/courses")
 * @param {string} [props.image] - OG image URL
 * @param {object} [props.courseSchema] - Course data for JSON-LD
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image = '/scope-social-share.png',
  courseSchema
}) => {
  const siteTitle = title ? `${title} | ${BRANDING.fullName}` : `${BRANDING.fullName} | Best Software Training Institute in Chennai`;
  const metaDescription = description || "Master Generative AI, Machine Learning, NLP, and more with expert mentorship. Get placement support at Scope AI Hub, Chennai's top-rated AI training institute.";
  const metaKeywords = keywords || "AI Training Institute Chennai, Prompt Engineering Course, Machine Learning Training, NLP Course, Data Analytics, MLOps, Python AI, Placement Support, Scope AI Hub";
  const siteUrl = "https://scopeaihub.in";

  // EducationalOrganization JSON-LD (shown on every page)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": BRANDING.fullName,
    "url": siteUrl,
    "logo": `${siteUrl}/scope-logo.png`,
    "description": metaDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    },
    "sameAs": []
  };

  // Course JSON-LD (only on course detail pages)
  const courseJsonLd = courseSchema ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseSchema.title,
    "description": courseSchema.tagline,
    "provider": {
      "@type": "EducationalOrganization",
      "name": BRANDING.fullName,
      "url": siteUrl
    },
    "url": `${siteUrl}/courses/${courseSchema.slug}`,
    ...(courseSchema.duration && { "timeRequired": courseSchema.duration }),
    ...(courseSchema.tier && { "educationalLevel": courseSchema.tier }),
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical ? `${siteUrl}${canonical}` : siteUrl} />
      <meta property="og:site_name" content={BRANDING.fullName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD: EducationalOrganization */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>

      {/* JSON-LD: Course (conditional) */}
      {courseJsonLd && (
        <script type="application/ld+json">{JSON.stringify(courseJsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
