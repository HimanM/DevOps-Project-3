import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://backend-service:5000'}/api/:path*`,
      },
    ]
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
