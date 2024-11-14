export default function robots() {
  const baseUrl = 'https://tokenheadline.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
