import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read site URL from env or fallback to default
const rawSiteUrl = process.env.VITE_SITE_URL || 'https://tektonis.in';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

// Parse tool slugs from src/tools/registry.ts
const registryPath = path.join(rootDir, 'src', 'tools', 'registry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf8');

// Match all slug: '...' in TOOLS
const slugMatches = [...registryContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const slugs = Array.from(new Set(slugMatches.map(m => m[1])));

const currentDate = new Date().toISOString().split('T')[0];

const sitemapEntries = [
  `  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
  ...slugs.map(slug => `  <url>
    <loc>${siteUrl}/tools/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`)
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`;

const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`[Sitemap Generator] Generated sitemap.xml with ${slugs.length + 1} URLs at ${siteUrl} using clean /tools/<slug> paths`);

// Ensure robots.txt references the sitemap correctly
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
console.log(`[Sitemap Generator] Updated robots.txt referencing ${siteUrl}/sitemap.xml`);
