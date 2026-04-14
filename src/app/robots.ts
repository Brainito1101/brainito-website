import { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/page-metadata-defaults';

const DISALLOW = ['/auth/', '/logout-sync', '/api/', '/_next/'] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DISALLOW],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [...DISALLOW],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [...DISALLOW],
        crawlDelay: 1,
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [...DISALLOW],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [...DISALLOW],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
