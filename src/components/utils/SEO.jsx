import React from"react";
import { Helmet } from"react-helmet-async";
import { BRANDING } from"../../data/branding";

/*
Enterprise SEO Component

Supports:
• Meta tags
• Canonical URLs
• Open Graph
• Twitter cards
• Organization schema
• Course schema
• FAQ schema
• Breadcrumb schema
• Local SEO
*/

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image ="/scope-social-share.png",
  courseSchema,
  faqSchema,
  breadcrumbs
}) => {

  const siteUrl ="https://scopeaihub.com";

  /* TITLE SEO */

  const siteTitle = title
    ? `${title} | Scope AI Hub`
    : `AI Training Institute in Chennai with Placement Support | Scope AI Hub`;

  /* DESCRIPTION */

  const metaDescription =
    description ||"Master Generative AI, Machine Learning, NLP and Data Science with expert mentorship. Get placement support at Scope AI Hub — Chennai's leading AI training institute.";

  /* KEYWORDS */

  const metaKeywords =
    keywords ||"AI Training Institute Chennai, Artificial Intelligence Course Chennai, Generative AI Course Chennai, Machine Learning Course Chennai, Prompt Engineering Training, NLP Course Chennai, Data Science Course Chennai, Python AI Training, MLOps Training, AI Certification Course Chennai, AI Placement Training Chennai, Best AI Institute Chennai, Software Engineering AI Course, AI Bootcamp Chennai, Scope AI Hub Chennai";

  /* URL HANDLING */

  const absoluteCanonical = canonical
    ? `${siteUrl}${canonical}`
    : siteUrl;

  const absoluteImage = image;

  /* ORGANIZATION SCHEMA */

  const orgSchema = {"@context":"https://schema.org","@type":"EducationalOrganization",
    name: BRANDING.fullName,
    url: siteUrl,
    logo: `${siteUrl}/scope-logo.png`,
    description: metaDescription,
    address: {"@type":"PostalAddress",
      addressLocality:"Chennai",
      addressRegion:"Tamil Nadu",
      addressCountry:"IN"
    },
    areaServed: {"@type":"Country",
      name:"India"
    },
    contactPoint: {"@type":"ContactPoint",
      contactType:"customer support",
      areaServed:"IN"
    },
    sameAs: []
  };

  /* COURSE SCHEMA */

  const courseJsonLd = courseSchema
    ? {"@context":"https://schema.org","@type":"Course",
        name: courseSchema.title,
        description: courseSchema.tagline,
        educationalCredentialAwarded:"Certificate",
        provider: {"@type":"EducationalOrganization",
          name: BRANDING.fullName,
          url: siteUrl
        },
        url: `${siteUrl}/courses/${courseSchema.slug}`,
        ...(courseSchema.duration && {
          timeRequired: courseSchema.duration
        }),
        ...(courseSchema.tier && {
          educationalLevel: courseSchema.tier
        })
      }
    : null;

  /* FAQ SCHEMA */

  const faqJsonLd = faqSchema
    ? {"@context":"https://schema.org","@type":"FAQPage",
        mainEntity: faqSchema.map((item) => ({"@type":"Question",
          name: item.question,
          acceptedAnswer: {"@type":"Answer",
            text: item.answer
          }
        }))
      }
    : null;

  /* BREADCRUMB SCHEMA */

  const breadcrumbJsonLd = breadcrumbs
    ? {"@context":"https://schema.org","@type":"BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({"@type":"ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.path}`
        }))
      }
    : null;

  return (
    <Helmet>

      {/* BASIC META */}

      <title>{siteTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index,follow,max-image-preview:large" />

      <link rel="canonical" href={absoluteCanonical} />

      {/* GEO SEO */}

      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai" />
      <meta name="geo.position" content="13.0827;80.2707" />
      <meta name="ICBM" content="13.0827, 80.2707" />

      {/* THEME COLOR */}

      <meta name="theme-color" content="#0B0F19" />

      {/* OPEN GRAPH */}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content="Scope AI Hub Training Institute Chennai" />
      <meta property="og:url" content={absoluteCanonical} />
      <meta property="og:site_name" content={BRANDING.fullName} />

      {/* TWITTER */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:site" content="@scopeaihub" />

      {/* JSON-LD SCHEMAS */}

      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>

      {courseJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(courseJsonLd)}
        </script>
      )}

      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}

      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}

    </Helmet>
  );
};

export default SEO;
