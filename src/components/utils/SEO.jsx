import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRANDING } from '../../data/branding';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  image = '/scope-social-share.png' 
}) => {
  const siteTitle = title ? `${title} | ${BRANDING.fullName}` : `${BRANDING.fullName} | Best Software Training Institute in Chennai`;
  const metaDescription = description || "Master Full Stack Development, Data Science, and AI with expert mentorship. Get 100% placement support at Scope AI Hub, Chennai's top-rated training institute.";
  const metaKeywords = keywords || "Software Training Institute Chennai, Full Stack Developer Course, Data Science Training, MERN Stack, Python Course, Placement Support, Scope Global";
  const siteUrl = "https://scopeaihub.com"; // Ideally from env or config

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
    </Helmet>
  );
};

export default SEO;
