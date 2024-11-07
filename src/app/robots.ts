import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tokenheadline.vercel.app'
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/articles',
        '/opinion',
        '/interview',
        '/press-release',
        '/learn',
      ],
      disallow: [
        '/private/',
        '/admin/',
        '/user/',
        '/account/',
        '/staging/',
        '/test/',
        '/*.pdf',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
