/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cms.tokenheadline.com', 'secure.gravatar.com'], // Ensure only necessary domains are listed
  },
}

export default nextConfig
