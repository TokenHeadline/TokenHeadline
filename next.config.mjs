/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.tokenheadline.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
  },
}

export default nextConfig
