/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'img.freepik.com',
      'w7.pngwing.com',
      'academy-public.coinmarketcap.com',
    ], // Ensure only necessary domains are listed
  },
}

export default nextConfig
