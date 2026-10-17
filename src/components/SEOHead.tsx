import { useEffect } from 'react';
import { ToolDefinition } from '../types/tool';

interface SEOHeadProps {
  tool?: ToolDefinition | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ tool }) => {
  useEffect(() => {
    // Single configurable environment variable for production URL switch
    const rawSiteUrl = 
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
      (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SITE_URL) ||
      'https://tektonis.in';
    const siteUrl = rawSiteUrl.replace(/\/+$/, '');

    const siteTitle = tool
      ? tool.metaTitle
      : 'Tektonis — Free Online Web & Developer Utilities';

    const metaDescription = tool
      ? tool.metaDescription
      : 'Fast, private, and 100% free online utility tools. High-demand converters, formatters, calculators, and generators with zero data tracking on Tektonis.';

    const pageUrl = tool ? `${siteUrl}/?tool=${tool.slug}` : `${siteUrl}/`;
    const ogImageUrl = `${siteUrl}/og-image.png`;

    // 1. Update document title
    document.title = siteTitle;

    // Helper to safely set or create meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', metaDescription);

    // 3. OpenGraph Social Cards
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Tektonis');
    setMetaTag('property', 'og:title', siteTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:url', pageUrl);
    setMetaTag('property', 'og:image', ogImageUrl);

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', siteTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

    // 6. JSON-LD Structured Data (WebApplication + FAQPage)
    let jsonLdScript = document.getElementById('seo-json-ld');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-json-ld';
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }

    if (tool) {
      const graph: any[] = [
        {
          '@type': 'WebApplication',
          name: tool.name,
          url: pageUrl,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All',
          browserRequirements: 'Requires modern web browser with JavaScript enabled',
          description: tool.metaDescription,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${siteUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: tool.name,
              item: pageUrl,
            },
          ],
        },
      ];

      if (tool.faqs && tool.faqs.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        });
      }

      jsonLdScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graph,
      });
    } else {
      const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'Tektonis',
            url: `${siteUrl}/`,
            description: 'Fast, private, and 100% free online utility tools with zero data tracking.',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'Organization',
            name: 'Tektonis',
            url: `${siteUrl}/`,
            logo: `${siteUrl}/og-image.png`,
          },
        ],
      };
      jsonLdScript.textContent = JSON.stringify(homeSchema);
    }
  }, [tool]);

  return null;
};
