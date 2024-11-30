import client from '../lib/apolloClient'
import { gql } from '@apollo/client'

export default async function sitemap() {
  const baseUrl = 'https://tokenheadline.com'

  // Define the GraphQL query to fetch all articles
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
    const { data } = await client.query({ query: ARTICLES_QUERY })

    // Map over the fetched articles
    const articleSitemapEntries = data.posts.nodes.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.dateGmt).toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1,
    }))

    // Define static entries
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

    // Return combined entries
    return [...staticEntries, ...articleSitemapEntries]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
}
