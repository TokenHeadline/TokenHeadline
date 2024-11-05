/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['tokenheadline.com', 'secure.gravatar.com'], // Ensure only necessary domains are listed
  },
}

export default nextConfig
