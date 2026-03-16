/**
 * Build-time sitemap generator.
 * Reads course slugs from src/data/courses.js and generates sitemap.xml.
 *
 * Usage: node scripts/generate-sitemap.js
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://scopeaihub.com';

// Static routes
const staticRoutes = [
  '/',
  '/about',
  '/admissions',
  '/reviews',
  '/contact',
  '/faq',
  '/courses',
  '/privacy-policy',
  '/terms-conditions',
  '/nda-policy',
  '/refund-policy',
  '/disclaimer',
  '/legal/trainer-conduct',
  '/careers/join-as-trainer',
  '/sitemap',
];

// Extract slugs from courses.js
function extractCourseSlugs() {
  const coursesPath = resolve(__dirname, '../src/data/courses.js');
  const content = readFileSync(coursesPath, 'utf-8');

  const slugs = [];
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function generateSitemap() {
  const courseSlugs = extractCourseSlugs();
  const today = new Date().toISOString().split('T')[0];

  const allUrls = [
    ...staticRoutes.map((route) => ({
      loc: `${SITE_URL}${route}`,
      priority: route === '/' ? '1.0' : '0.8',
      changefreq: route === '/' ? 'weekly' : 'monthly',
    })),
    ...courseSlugs.map((slug) => ({
      loc: `${SITE_URL}/courses/${slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated with ${allUrls.length} URLs → public/sitemap.xml`);
}

generateSitemap();
