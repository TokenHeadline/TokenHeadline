import server from '@/lib/apolloserver'
import { gql } from '@apollo/client'

const baseUrl = 'https://tokenheadline.com'

export async function GET() {
  const ARTICLES_QUERY = gql`
    query GET {
      posts(first: 10) {
        nodes {
          slug
          dateGmt
        }
      }
    }
  `

  try {
    const { data } = await server.query({ query: ARTICLES_QUERY })

    const articleSitemapEntries = data.posts.nodes.map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      lastModified: new Date(article.dateGmt).toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1,
    }))

    const staticEntries = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/articles`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/opinion`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/press-release`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/interview`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/learn`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]

    const allEntries = [...staticEntries, ...articleSitemapEntries]

    const sitemap = generateXml(allEntries)

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}

function generateXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries
      .map(
        (entry) => `
      <url>
        <loc>${entry.url}</loc>
        <lastmod>${entry.lastModified}</lastmod>
        <changefreq>${entry.changeFrequency}</changefreq>
        <priority>${entry.priority}</priority>
      </url>
    `
      )
      .join('')}
  </urlset>`
}
