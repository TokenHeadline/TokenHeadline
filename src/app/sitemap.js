import server from '../lib/apolloServer'
import { gql } from '@apollo/client'

export default async function sitemap() {
  const baseUrl = 'https://tokenheadline.com'

  // Define the GraphQL query to fetch all articles
  const ARTICLES_QUERY = gql`
    query GET {
      posts(first: 100) {  // Adjust the number based on your API's pagination limit
        nodes {
          slug  // Assuming articles have unique slugs
          updatedAt  // Assuming articles have a timestamp for last update
        }
      }
    }
  `

  const { data } = await server.query({ query: ARTICLES_QUERY })

  const articleSitemapEntries = data.posts.nodes.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt).toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 1,
  }))

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

  return [...staticEntries, ...articleSitemapEntries]
}
