import type { MetadataRoute } from 'next'
import { SITE_URL, isIndexingEnabled } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login', '/reset-password'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
