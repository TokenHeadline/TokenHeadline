import server from '@/lib/apolloserver'
import { gql } from '@apollo/client'

const baseUrl = 'https://tokenheadline.com'

export async function GET() {
  // Define the GraphQL query
  const ARTICLES_QUERY = gql`
    query GET {
      posts(first: 100) {
        nodes {
          slug
          dateGmt
        }
      }
    }
  `

  try {
    // Fetch data from Apollo Client
    const { data } = await server.query({ query: ARTICLES_QUERY })

    // Generate sitemap entries for articles
    const articleSitemapEntries = data.posts.nodes.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.dateGmt).toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1,
    }))

    // Define static sitemap entries
    const staticEntries = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseUrl}/articles`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/opinion`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/press-release`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/interview`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/learn`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1,
      },
    ]

    // Combine static and dynamic entries
    const allEntries = [...staticEntries, ...articleSitemapEntries]

    // Generate XML
    const sitemap = generateXml(allEntries)

    // Return the XML response
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

// Function to generate XML from sitemap entries
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
