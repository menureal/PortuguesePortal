/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configurações adicionais
  experimental: {
    serverComponentsExternalPackages: ['ws'],
  },
};

export default nextConfig;