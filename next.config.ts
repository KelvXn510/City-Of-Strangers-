import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.NEXT_PUBLIC_APP_URL || 'localhost:3000'],
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

export default nextConfig
