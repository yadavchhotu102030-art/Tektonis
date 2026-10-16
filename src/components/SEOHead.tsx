import { useEffect } from 'react';
import { ToolDefinition } from '../types/tool';

interface SEOHeadProps {
  tool?: ToolDefinition | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ tool }) => {
  useEffect(() => {
    const siteTitle = tool
      ? `${tool.name} – Free Online Tool | Tektonis`
      : 'Tektonis – 100% Free Online Web & Developer Utilities';

    const metaDescription = tool
      ? tool.metaDescription
      : 'Fast, private, and 100% free online utility tools. High-demand converters, formatters, calculators, and generators with zero data tracking on tektonis.in.';

    document.title = siteTitle;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDescription);

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', siteTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    const baseOrigin = window.location.hostname.includes('tektonis.in') ? 'https://tektonis.in' : window.location.origin;
    const currentUrl = baseOrigin + window.location.pathname + (tool ? `?tool=${tool.slug}` : '');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Inject JSON-LD Schema.org structured data
    let jsonLdScript = document.getElementById('seo-json-ld');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-json-ld';
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }

    if (tool) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: tool.name,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires modern web browser',
            description: tool.shortDescription,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          },
          ...(tool.faqs && tool.faqs.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  mainEntity: tool.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer,
                    },
                  })),
                },
              ]
            : []),
        ],
      };
      jsonLdScript.textContent = JSON.stringify(schemaData);
    } else {
      const homeSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tektonis',
        url: 'https://tektonis.in',
        description: 'Fast, private, and 100% free online utility tools on tektonis.in.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `https://tektonis.in/?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
      jsonLdScript.textContent = JSON.stringify(homeSchema);
    }
  }, [tool]);

  return null;
};
