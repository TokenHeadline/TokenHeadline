import { MetadataRoute } from 'next'

export default async function sitemap() {
  const baseUrl = 'https://tokenheadline.vercel.app'

  const response = await fetch(
    'https://ap-south-1.cdn.hygraph.com/content/cm1adzv1802sy07ut097esnry/master',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query GetAllArticlesSlugs {
          articles {
            slug
            date
          }
        }
      `,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch article slugs')
  }

  const data = await response.json()
  const articles = data?.data?.articles || []

  const articleUrls = articles.map((article) => {
    const formattedDate = new Date(article.date).toISOString().split('T')[0]

    return {
      url: `${baseUrl}article/${article.slug}`,
      lastModified: formattedDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  })

  // Add the base URL entry to the sitemap
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0], // Ensure base URL uses ISO format
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/opinion`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/press-release`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/interview`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
    },
    ...articleUrls,
  ]
}
