/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cms.tokenheadline.com', 'secure.gravatar.com'],
  },
}

export default nextConfig
