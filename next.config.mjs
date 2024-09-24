/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'img.freepik.com',
      'example.com',
      'academy-public.coinmarketcap.com',
      'w7.pngwing.com',
      'bsmedia.business-standard.com',
      'cloudinary.hbs.edu',
      'www.reuters.com',
      'www.fairobserver.com',
      'static01.nyt.com',
      'www.xrtoday.com',
      'ap-south-1.graphassets.com',
      'media.licdn.com',
    ], // Ensure only necessary domains are listed
  },
}

export default nextConfig
