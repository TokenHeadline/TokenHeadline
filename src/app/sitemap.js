export default async function sitemap() {
  const baseUrl = 'https://tokenheadline.com'

  return [
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
      priority: 0.8, // Optional: add priority values for other routes
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
  ]
}
