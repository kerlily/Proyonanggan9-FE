import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proyonanggan.my.id',
        port: '',
        pathname: '/storage/**',
      },
    ],
    // Tambahan untuk kompatibilitas
    domains: ['proyonanggan.my.id'],
  },
};

export default nextConfig;