/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', 
      },
      {
        source: '/ws',
        destination: 'http://localhost:5000/ws',
      },
    ]
  },
};

export default nextConfig;