/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'tokenheadline-wordpress/graphql' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { hostname: 'cms.tokenheadline.com' },
    ],
  },
}

export default nextConfig
