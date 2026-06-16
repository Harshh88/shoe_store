/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://shoestore-production-3d6f.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;
