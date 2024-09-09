/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'img.freepik.com',
      'example.com',
      'academy-public.coinmarketcap.com',
      'w7.pngwing.com',
    ], // Ensure only necessary domains are listed
  },
}

export default nextConfig
