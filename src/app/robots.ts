import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/logout-sync', '/api/', '/_next/'],
    },
    sitemap: 'https://brainito.com/sitemap.xml',
  };
}
